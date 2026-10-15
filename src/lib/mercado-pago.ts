import { MercadoPagoConfig, Preference } from 'mercadopago';

import { calcularCostoEnvio } from '@/lib/envio';
import type { IOrden, IOrdenItem } from '@/types';

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

if (!accessToken) {
  throw new Error('MERCADO_PAGO_ACCESS_TOKEN no está configurado en las variables de entorno');
}

const client = new MercadoPagoConfig({
  accessToken,
  options: { timeout: 5000 },
});

interface PreferenceItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
}

interface PreferencePayer {
  name: string;
  email: string;
  phone?: { number: string };
  address?: {
    street_name: string;
    zip_code: string;
  };
}

interface PreferenceBackUrls {
  success: string;
  failure: string;
  pending: string;
}

function construirItems(items: IOrdenItem[], nombreProducto: string): PreferenceItem[] {
  const productos = items.map((item, index) => ({
    id: `${item.productoId}-${item.varianteId}`,
    title: `${nombreProducto} (Variante ${index + 1})`,
    quantity: item.cantidad,
    unit_price: item.precio,
    currency_id: 'COP',
  }));

  const subtotal = items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  const costoEnvio = calcularCostoEnvio(subtotal);
  if (costoEnvio === 0) return productos;

  // Por qué: Mercado Pago no cobra envío calculado por nosotros, así que el
  // costo viaja como un ítem más para que el total cobrado coincida con el carrito.
  return [
    ...productos,
    { id: 'envio', title: 'Envío', quantity: 1, unit_price: costoEnvio, currency_id: 'COP' },
  ];
}

function construirPayer(orden: IOrden): PreferencePayer {
  return {
    name: orden.nombre,
    email: orden.email,
    phone: { number: orden.telefono },
    address: {
      street_name: orden.direccion,
      zip_code: orden.codigoPostal ?? '',
    },
  };
}

function construirBackUrls(): PreferenceBackUrls {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  return {
    success: `${baseUrl}/confirmacion`,
    failure: `${baseUrl}/carrito`,
    pending: `${baseUrl}/carrito`,
  };
}

// Por qué: Mercado Pago descarta las URLs de localhost como inválidas y, como
// auto_return exige back_urls.success válida, en local la preferencia truena.
function esUrlLocal(url: string): boolean {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/.test(url);
}

interface PreferenceBody {
  items: PreferenceItem[];
  payer: PreferencePayer;
  back_urls: PreferenceBackUrls;
  auto_return?: 'approved';
  external_reference: string;
  statement_descriptor: string;
}

function construirBody(
  items: PreferenceItem[],
  payer: PreferencePayer,
  backUrls: PreferenceBackUrls,
  ordenId: number
): PreferenceBody {
  const body: PreferenceBody = {
    items,
    payer,
    back_urls: backUrls,
    external_reference: `orden-${ordenId}`,
    statement_descriptor: 'URBANSHOP',
  };

  if (!esUrlLocal(backUrls.success)) body.auto_return = 'approved';

  return body;
}

export async function crearPreferencia(
  orden: IOrden,
  nombreProducto: string,
  ordenId: number
) {
  const preference = new Preference(client);

  const items = construirItems(orden.items, nombreProducto);
  const payer = construirPayer(orden);
  const body = construirBody(items, payer, construirBackUrls(), ordenId);

  const resultado = await preference.create({ body });

  return {
    preferenceId: resultado.id,
    initPoint: resultado.init_point,
    sandboxInitPoint: resultado.sandbox_init_point,
  };
}

import { MercadoPagoConfig, Preference } from 'mercadopago';

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
  phone?: { string: string };
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
  return items.map((item, index) => ({
    id: `${item.productoId}-${item.varianteId}`,
    title: `${nombreProducto} (Variante ${index + 1})`,
    quantity: item.cantidad,
    unit_price: item.precio,
    currency_id: 'COP',
  }));
}

function construirPayer(orden: IOrden): PreferencePayer {
  return {
    name: orden.nombre,
    email: orden.email,
    phone: { string: orden.telefono },
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

export async function crearPreferencia(orden: IOrden, nombreProducto: string) {
  const preference = new Preference(client);

  const items = construirItems(orden.items, nombreProducto);
  const payer = construirPayer(orden);
  const backUrls = construirBackUrls();

  const resultado = await preference.create({
    body: {
      items,
      payer,
      back_urls: backUrls,
      auto_return: 'approved',
      external_reference: `orden-${Date.now()}`,
      statement_descriptor: 'URBANSHOP',
    },
  });

  return {
    preferenceId: resultado.id,
    initPoint: resultado.init_point,
    sandboxInitPoint: resultado.sandbox_init_point,
  };
}

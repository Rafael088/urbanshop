import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment, WebhookSignatureValidator } from 'mercadopago';

import type { IApiResponse, IOrden } from '@/types';
import { prisma } from '@/lib/prisma';
import { reducirStockItems } from '@/lib/stock';
import { enviarEmailConfirmacion } from '@/lib/email';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN ?? '',
  options: { timeout: 5000 },
});

const validator = new WebhookSignatureValidator();

interface WebhookPayload {
  action: string;
  type: string;
  data: { id: string };
}

function verificarFirma(req: Request, rawBody: string): boolean {
  try {
    validator.validate({
      xSignature: req.headers.get('x-signature'),
      xRequestId: req.headers.get('x-request-id'),
      secretSignature: process.env.MERCADO_PAGO_WEBHOOK_SECRET ?? '',
      rawBody,
    });
    return true;
  } catch {
    return false;
  }
}

function mapearEstadoPago(status: string): 'PENDIENTE' | 'PAGADA' | 'CANCELADA' {
  if (status === 'approved') return 'PAGADA';
  if (status === 'rejected' || status === 'cancelled') return 'CANCELADA';
  return 'PENDIENTE';
}

async function actualizarOrdenPorPago(paymentId: string) {
  const pago = await new Payment(client).get({ id: paymentId });
  const externalRef = (pago as unknown as { external_reference: string }).external_reference;
  const ordenId = Number(externalRef.replace('orden-', ''));

  const orden = await prisma.orden.findFirst({
    where: { id: ordenId },
    include: { items: true },
  });
  if (!orden) return null;

  const estado = mapearEstadoPago(pago.status);

  if (estado === 'PAGADA') {
    await reducirStockItems(orden.items);
    const ordenParaEmail: IOrden = {
      nombre: orden.nombre,
      email: orden.email,
      telefono: orden.telefono,
      direccion: orden.direccion,
      ciudad: orden.ciudad,
      departamento: orden.departamento,
      codigoPostal: orden.codigoPostal ?? undefined,
      items: orden.items,
    };
    await enviarEmailConfirmacion(ordenParaEmail, orden.items);
  }

  return prisma.orden.update({
    where: { id: orden.id },
    data: {
      mpPaymentId: paymentId,
      mpStatus: pago.status,
      estado,
    },
  });
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();

    if (!verificarFirma(req, rawBody)) {
      return NextResponse.json<IApiResponse<null>>(
        { data: null, error: 'Firma inválida', message: 'No se pudo verificar la autenticidad del webhook' },
        { status: 401 }
      );
    }

    const payload: WebhookPayload = JSON.parse(rawBody);

    if (payload.type !== 'payment') {
      return NextResponse.json<IApiResponse<null>>(
        { data: null, error: 'Evento no soportado', message: `Tipo ${payload.type} no manejado` },
        { status: 400 }
      );
    }

    const orden = await actualizarOrdenPorPago(payload.data.id);

    if (!orden) {
      return NextResponse.json<IApiResponse<null>>(
        { data: null, error: 'Orden no encontrada', message: 'No se encontró la orden asociada al pago' },
        { status: 404 }
      );
    }

    return NextResponse.json<IApiResponse<typeof orden>>({
      data: orden,
      error: null,
      message: 'Webhook procesado exitosamente',
    });
  } catch (error) {
    console.error('Error al procesar webhook:', error);
    return NextResponse.json<IApiResponse<null>>(
      { data: null, error: 'Error al procesar webhook', message: 'Intenta de nuevo más tarde' },
      { status: 500 }
    );
  }
}

import { Resend } from 'resend';

import type { IOrden, IOrdenItem } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(precio);
}

function generarHtmlOrden(orden: IOrden, items: IOrdenItem[]): string {
  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">Producto #${item.productoId}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.cantidad}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formatearPrecio(item.precio)}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formatearPrecio(item.precio * item.cantidad)}</td>
        </tr>`
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1a1a1a;">¡Gracias por tu compra, ${orden.nombre}!</h1>
      <p>Tu orden ha sido confirmada. Aquí están los detalles:</p>

      <h2>Datos de envío</h2>
      <p>
        <strong>Dirección:</strong> ${orden.direccion}<br>
        <strong>Ciudad:</strong> ${orden.ciudad}, ${orden.departamento}<br>
        ${orden.codigoPostal ? `<strong>Código postal:</strong> ${orden.codigoPostal}<br>` : ''}
        <strong>Teléfono:</strong> ${orden.telefono}
      </p>

      <h2>Resumen de la orden</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 8px; text-align: left;">Producto</th>
            <th style="padding: 8px; text-align: left;">Cantidad</th>
            <th style="padding: 8px; text-align: left;">Precio unit.</th>
            <th style="padding: 8px; text-align: left;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <p style="margin-top: 20px; font-size: 18px;">
        <strong>Total: ${formatearPrecio(orden.items.reduce((sum, i) => sum + i.precio * i.cantidad, 0))}</strong>
      </p>

      <p style="color: #666; margin-top: 30px;">
        Recibirás notificaciones sobre el envío de tu pedido.<br>
        Gracias por comprar en UrbanShop.
      </p>
    </div>
  `;
}

export async function enviarEmailConfirmacion(
  orden: IOrden,
  items: IOrdenItem[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const html = generarHtmlOrden(orden, items);

    await resend.emails.send({
      from: 'UrbanShop <onboarding@resend.dev>',
      to: orden.email,
      subject: '¡Gracias por tu compra en UrbanShop!',
      html,
    });

    return { success: true };
  } catch (error) {
    console.error('Error al enviar email de confirmación:', error);
    return { success: false, error: 'No se pudo enviar el email de confirmación' };
  }
}

'use client';

import { useState } from 'react';

import type { ErroresEnvio, IDatosEnvio } from '@/types';
import { datosEnvioSchema, mapearErrores } from '@/lib/checkout';

import { CheckoutCampo } from '@/components/CheckoutCampo';

interface CheckoutFormProps {
  onPagar: (datos: IDatosEnvio) => void;
  enviando: boolean;
}

const DATOS_VACIOS: IDatosEnvio = {
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  departamento: '',
  codigoPostal: '',
};

export function CheckoutForm({ onPagar, enviando }: CheckoutFormProps) {
  const [datos, setDatos] = useState<IDatosEnvio>(DATOS_VACIOS);
  const [errores, setErrores] = useState<ErroresEnvio>({});

  const actualizarCampo = (campo: keyof IDatosEnvio, valor: string): void => {
    setDatos((previo) => ({ ...previo, [campo]: valor }));
  };

  const manejarEnvio = (evento: React.FormEvent<HTMLFormElement>): void => {
    evento.preventDefault();

    const validacion = datosEnvioSchema.safeParse(datos);
    if (!validacion.success) {
      setErrores(mapearErrores(validacion.error.issues));
      return;
    }

    setErrores({});
    onPagar(validacion.data);
  };

  return (
    <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
      <CheckoutCampo
        id="nombre"
        etiqueta="Nombre completo"
        valor={datos.nombre}
        error={errores.nombre}
        onChange={(valor) => actualizarCampo('nombre', valor)}
      />
      <CheckoutCampo
        id="email"
        etiqueta="Email"
        tipo="email"
        valor={datos.email}
        error={errores.email}
        onChange={(valor) => actualizarCampo('email', valor)}
      />
      <CheckoutCampo
        id="telefono"
        etiqueta="Teléfono"
        tipo="tel"
        valor={datos.telefono}
        error={errores.telefono}
        onChange={(valor) => actualizarCampo('telefono', valor)}
      />
      <CheckoutCampo
        id="direccion"
        etiqueta="Dirección"
        valor={datos.direccion}
        error={errores.direccion}
        onChange={(valor) => actualizarCampo('direccion', valor)}
      />
      <CheckoutCampo
        id="ciudad"
        etiqueta="Ciudad"
        valor={datos.ciudad}
        error={errores.ciudad}
        onChange={(valor) => actualizarCampo('ciudad', valor)}
      />
      <CheckoutCampo
        id="departamento"
        etiqueta="Departamento"
        valor={datos.departamento}
        error={errores.departamento}
        onChange={(valor) => actualizarCampo('departamento', valor)}
      />
      <CheckoutCampo
        id="codigoPostal"
        etiqueta="Código postal (opcional)"
        valor={datos.codigoPostal ?? ''}
        error={errores.codigoPostal}
        onChange={(valor) => actualizarCampo('codigoPostal', valor)}
      />

      <button
        type="submit"
        disabled={enviando}
        className="mt-2 bg-tinta px-6 py-3 font-semibold text-papel transition-colors hover:bg-tinta-suave disabled:cursor-not-allowed disabled:opacity-50"
      >
        {enviando ? 'Procesando…' : 'Pagar con Mercado Pago'}
      </button>
    </form>
  );
}

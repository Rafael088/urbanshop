'use client';

interface CheckoutCampoProps {
  id: string;
  etiqueta: string;
  valor: string;
  tipo?: string;
  error?: string;
  onChange: (valor: string) => void;
}

export function CheckoutCampo({
  id,
  etiqueta,
  valor,
  tipo = 'text',
  error,
  onChange,
}: CheckoutCampoProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="font-mono text-xs tracking-[0.16em] text-tinta-suave uppercase"
      >
        {etiqueta}
      </label>
      <input
        id={id}
        name={id}
        type={tipo}
        value={valor}
        onChange={(evento) => onChange(evento.target.value)}
        aria-invalid={error ? true : undefined}
        className="border border-tinta bg-papel px-3 py-2 text-tinta outline-none focus:border-prensa"
      />
      {error && (
        <p className="font-mono text-xs text-prensa" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

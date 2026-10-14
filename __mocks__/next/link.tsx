import type { LinkProps } from 'next/link';

export default function MockLink({ children, href }: LinkProps & { children: React.ReactNode }) {
  return <a href={typeof href === 'string' ? href : href.pathname ?? ''}>{children}</a>;
}

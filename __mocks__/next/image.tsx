import type { ImageProps } from 'next/image';

export default function MockImage({ alt, src }: ImageProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} src={typeof src === 'string' ? src : undefined} />;
}

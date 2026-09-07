import imageUrlBuilder from '@sanity/image-url';
import {client} from './client';

const builder = imageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export function urlForImage(
  source: Parameters<typeof builder.image>[0] | null | undefined,
  width = 1200,
): string | undefined {
  if (!source) return undefined;
  try {
    return urlFor(source).width(width).auto('format').url() || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Convert amount into cents.
 * @param value Ej: 25.99 => 2599
 */
export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Convert amount from cents.
 * @param cents Ej: 2599 => 25.99
 */
export function fromCents(cents: number): number {
  return cents / 100;
}

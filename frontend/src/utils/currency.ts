export const formatPrice = (cents: number) => `${(cents / 100).toFixed(2)}`;

export const currencyToCents = (currencyValue: string): number => {
  const numericValue = parseFloat(currencyValue.replace(/[^0-9.-]/g, ''));
  return Math.round(numericValue * 100);
};

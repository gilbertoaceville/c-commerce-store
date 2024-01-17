export function formatPrice(
  price: number | string,
  format: "code" | "symbol" = "code",
  currencyCode = "USD",
  locale = "en-US"
): string {
  if (!price) return "";

  const formattedNumber = new Intl.NumberFormat(locale).format(Number(price));

  if (format === "code") {
    return `${formattedNumber} ${currencyCode}`;
  }

  if (format === "symbol") {
    const formattedCurrency = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    }).format(Number(price));
    return formattedCurrency;
  }

  return "";
}

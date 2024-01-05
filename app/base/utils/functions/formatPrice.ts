import { numericStringRegExp } from "@/base/utils/constants/regex";

export function formatPrice(price: number | string, currencyCode = "USD", locale = "en-US"): string {
  const priceString = price?.toString() || "0";

  // if price is a string containing only numbers
  if (numericStringRegExp.test(priceString)) {
    return new Intl.NumberFormat(locale).format(Number(priceString)) + " " + currencyCode;
  }

  return priceString;
}
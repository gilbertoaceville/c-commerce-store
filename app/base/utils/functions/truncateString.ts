export function getTruncatedString(str: string) {
  if (typeof str !== "string") throw new Error("This is not a string");
  return str.length <= 20 ? str : `${str.substring(0, 20)}...`;
}

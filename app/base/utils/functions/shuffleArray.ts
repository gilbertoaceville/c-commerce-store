export function shuffledArray<T>(array: T[]): T[] {
  const arrayLength = array.length;

  for (let i = arrayLength - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

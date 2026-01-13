export const pickRandom = <T>(items: readonly T[], count: number): T[] => {
  if (count <= 0) {
    return [];
  }

  if (items.length <= count) {
    return [...items];
  }

  const result: T[] = [];
  const usedIndex = new Set<number>();

  while (result.length < count) {
    const index = Math.floor(Math.random() * items.length);

    if (!usedIndex.has(index)) {
      usedIndex.add(index);
      result.push(items[index]);
    }
  }

  return result;
};

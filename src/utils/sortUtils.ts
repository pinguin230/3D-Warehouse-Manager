export const quickSort = <T, K extends keyof T>(arr: T[], key: K): T[] => {
  if (arr.length <= 1) return arr;

  const [pivot, ...rest] = arr;
  const left = rest.filter(item => item[key] < pivot[key]);
  const right = rest.filter(item => item[key] >= pivot[key]);

  return [...quickSort(left, key), pivot, ...quickSort(right, key)];
};

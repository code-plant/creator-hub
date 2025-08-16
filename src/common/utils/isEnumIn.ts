export function isEnumIn<T extends string, const In extends T[]>(
  value: T | null | undefined,
  set: In
): value is In[number] {
  return (set as (string | null | undefined)[]).includes(value);
}

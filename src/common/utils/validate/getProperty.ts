export function getProperty(obj: object, key: string): unknown {
  return obj[key as keyof typeof obj];
}

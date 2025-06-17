type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export function normalizeJson(data: JsonValue): JsonValue {
  if (data === null || typeof data !== "object") {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => normalizeJson(item));
  }

  const normalized: { [key: string]: JsonValue } = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      // Try to parse as number
      const num = Number(value);
      if (!isNaN(num) && value.trim() !== "") {
        normalized[key] = num;
        continue;
      }

      // Try to parse as date
      const date = new Date(value);
      if (!isNaN(date.getTime()) && value.trim() !== "") {
        normalized[key] = date;
        continue;
      }
    }

    // Recursively normalize nested objects and arrays
    normalized[key] = normalizeJson(value);
  }

  return normalized;
}

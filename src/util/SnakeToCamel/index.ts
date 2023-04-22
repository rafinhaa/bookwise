export const snakeToCamelCase = (
  obj: Record<string, any>
): Record<string, any> => {
  const newObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let newKey = key.replace(/_\w/g, (m) => m[1].toUpperCase());
      newObj[newKey] =
        typeof obj[key] === "object" ? snakeToCamelCase(obj[key]) : obj[key];
    }
  }

  return newObj;
};

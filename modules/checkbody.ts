const checkBody = (
  object: Record<string, any>,
  requiredFields: string[]
): boolean => {
  for (const field of requiredFields) {
    if (!object[field] || object[field].trim() === "") {
      return false;
    }
  }
  return true;
};

export default checkBody;

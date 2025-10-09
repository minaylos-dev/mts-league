export function cleanObject(data) {
  return data
    ? Object.keys(data).reduce((acc, field) => {
        if (field in data && typeof data[field] !== 'undefined') {
          acc[field] = data[field];
        }
        return acc;
      }, {})
    : data;
}

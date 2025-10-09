export default (data) => {
  return {
    filter: data.filter,
    limit: data.limit,
    offset: data.offset,
    totalCount: data.total_count,
  };
};

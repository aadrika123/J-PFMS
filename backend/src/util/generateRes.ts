export const generateRes = (
  data: any,
  count?: number,
  page?: number,
  limit?: number,
  others?: any,
) => {
    delete others?.total
  
  if (!data || data.length == 0) return null;

  if (data && (!(data.length > 0) || !count || !page || !limit)) return data;

  return {
    currentPage: page,
    count,
    totalPage: count && limit ? Math.ceil(count / limit) : 0,
    others,
    data,
  };
};

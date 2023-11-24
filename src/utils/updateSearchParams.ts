export const updateSearchParams = (
  cb: (params: URLSearchParams) => URLSearchParams
) => {
  const searchParams = new URLSearchParams(window.location.search);
  return cb(searchParams).toString();
};

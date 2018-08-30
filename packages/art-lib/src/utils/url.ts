export const getQueryString = (name: string, search?: string): string | null => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = (search || window.location.search.substr(1)).match(reg);
  if (r !== null) {
    return decodeURIComponent(r[2]);
  }

  return name === 'env' ? 'prod' : null;
};
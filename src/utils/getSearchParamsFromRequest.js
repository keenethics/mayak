export function getSearchParamsFromRequest(request, defaultValues = {}, transform = null) {
  if (!request?.url) return {};
  try {
    const url = new URL(request.url);
    const searchParams = {};
    url.searchParams.forEach((val, key) => {
      if (searchParams[key]) {
        if (Array.isArray(searchParams[key])) {
          searchParams[key].push(val);
        } else {
          const currValue = searchParams[key];
          searchParams[key] = [currValue, val];
        }
      } else {
        searchParams[key] = val;
      }
    });
    Object.entries(defaultValues).forEach(entry => {
      const [key, val] = entry;
      if (searchParams[key] === undefined) searchParams[key] = val;
    });
    return transform ? transform(searchParams) : searchParams;
  } catch (e) {
    return {};
  }
}

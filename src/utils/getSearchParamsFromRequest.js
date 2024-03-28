export function getSearchParamsFromRequest(request, defaultValues = {}, transform = it => it) {
  if (!request?.url) return {};
  try {
    const searchParams = {};
    const url = new URL(request.url);

    url.searchParams.forEach((val, key) => {
      if (!searchParams[key]) {
        searchParams[key] = val;
      } else {
        if (!Array.isArray(searchParams[key])) {
          searchParams[key] = [searchParams[key]];
        }
        searchParams[key].push(val);
      }
    });

    return transform({ ...defaultValues, ...searchParams });
  } catch (e) {
    console.error(e);
    return {};
  }
}

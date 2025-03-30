type TSearchParamsFilterObject = Record<string, string | number | boolean | undefined>;

export const convertFilterObjectToSearchParams = (filter: TSearchParamsFilterObject) => {
  const params = new URLSearchParams();

  Object.entries(filter).forEach(([key, value]) => {
    if (!key || value === undefined) {
      return;
    }
    params.append(key, String(value));
  });

  const searchParamsString = params.toString();

  return searchParamsString.length > 0 ? `?${searchParamsString}` : '';
};

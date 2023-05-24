const URL_ENDPOINT = process.env.NEXT_PUBLIC_URL ?? '';

type QueryModelResponse = {
  answer: string;
};

export const queryModelRequest = async (
  query: string
): Promise<QueryModelResponse> => {
  const encodedQuery = encodeURIComponent(query);
  const url = `${URL_ENDPOINT}/api/queryModel?query=${encodedQuery}`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const json = await resp.json();
  return json;
};

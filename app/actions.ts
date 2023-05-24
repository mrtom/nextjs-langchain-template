'use server';

import { queryModel } from 'lib/server/queryModel';

export const sendRequest = async (formData: FormData) => {
  const requestString = formData.get('query')?.toString() ?? '';
  const answer = await queryModel(requestString);

  return answer;
};

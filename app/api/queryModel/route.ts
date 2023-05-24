'use server';

import { NextResponse } from 'next/server';

import { queryModel } from 'lib/server/queryModel';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (query !== null) {
    const answer = await queryModel(query);
    return NextResponse.json({ answer });
  } else {
    return NextResponse.error();
  }
}

'use server';

import { NextResponse } from 'next/server';

import { buildStore } from 'lib/server/queryModel';

export async function GET() {
  try {
    await buildStore();
    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    return NextResponse.error();
  }
}

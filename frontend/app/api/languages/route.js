// /app/api/languages/route.js

import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_TRANSLATOR_API_URL + '/languages';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error while fetching Language Options');
    }
    const options = await response.json();
    return NextResponse.json(options);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

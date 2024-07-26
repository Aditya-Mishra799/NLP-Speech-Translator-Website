// /app/api/translate/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  const { text, source_lang, dest_lang } = await request.json();
  const url = process.env.NEXT_PUBLIC_TRANSLATOR_API_URL + '/translate';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, source_lang, dest_lang }),
    });

    if (!response.ok) {
      throw new Error('Error while fetching text translation');
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

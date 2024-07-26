import { NextResponse } from "next/server";

export async function POST(request) {
  const { text, lang } = await request.json();
  const url = process.env.NEXT_PUBLIC_TRANSLATOR_API_URL + "/text-to-speech";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, lang }),
    });

    if (!response.ok) {
      throw new Error("Error while fetching Speech for text");
    }

    const audioBlob = await response.blob();
    const buffer = await audioBlob.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    return new Response(uint8Array, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": 'attachment; filename="audio.mp3"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

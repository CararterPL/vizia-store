import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term')?.trim();

    if (!term || term.length < 3) return NextResponse.json({ items: [] });

    // Używamy .com - to rozwiązuje błąd ENOTFOUND ze screena
    const apiUrl = `https://api-shipx-pl.inpost.com/v1/points?query=${encodeURIComponent(term)}&type=paczkomat&limit=20`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) return NextResponse.json({ items: [] });

    const data = await response.json();
    return NextResponse.json({ items: data.items || [] });

  } catch (error) {
    console.error("SERVER_ERROR:", error);
    return NextResponse.json({ items: [] });
  }
}
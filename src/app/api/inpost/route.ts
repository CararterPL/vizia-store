import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term')?.trim();

    if (!term || term.length < 3) {
      return NextResponse.json({ items: [] });
    }

    // PROTOKÓŁ POSZUKIWANIA: 
    // InPost API najlepiej reaguje na 'city' dla nazw miast 
    // lub 'name' (pisanego wielkimi literami) dla konkretnych paczkomatów.
    
    // Najpierw próbujemy szukać po mieście
    let apiUrl = `https://api-shipx-pl.inpost.com/v1/points?city=${encodeURIComponent(term)}&type=paczkomat&limit=20`;
    
    // Jeśli term wygląda na ID paczkomatu (np. ma cyfry), szukamy po 'query'
    if (/\d/.test(term)) {
        apiUrl = `https://api-shipx-pl.inpost.com/v1/points?query=${encodeURIComponent(term.toUpperCase())}&type=paczkomat&limit=20`;
    }

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      console.error("INPOST_API_REJECTED status:", response.status);
      return NextResponse.json({ items: [] }); 
    }

    const data = await response.json();

    // FINALNY TEST: Jeśli po mieście nic nie ma, a term nie miał cyfr, 
    // spróbujmy jeszcze raz użyć 'query' jako ostatniej deski ratunku
    if ((!data.items || data.items.length === 0) && !/\d/.test(term)) {
        const fallbackRes = await fetch(`https://api-shipx-pl.inpost.com/v1/points?query=${encodeURIComponent(term)}&type=paczkomat&limit=20`);
        const fallbackData = await fallbackRes.json();
        return NextResponse.json({ items: fallbackData.items || [] });
    }

    return NextResponse.json({ items: data.items || [] });

  } catch (error) {
    console.error("SERVER_CRITICAL_ERROR:", error);
    return NextResponse.json({ items: [] });
  }
}
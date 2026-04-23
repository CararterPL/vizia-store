import { NextResponse } from 'next/server';

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY!;
const NRG_GROUP_ID = '168207050562602925';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Niepoprawny adres e-mail' }, { status: 400 });
    }

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        groups: [NRG_GROUP_ID],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('MailerLite error:', err);
      return NextResponse.json({ error: 'Błąd zapisu do listy' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Newsletter API error:', err);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}
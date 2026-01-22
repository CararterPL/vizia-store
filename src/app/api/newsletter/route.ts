import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      // TUTAJ DODAJEMY GRUPĘ:
      body: JSON.stringify({ 
        email: email,
        groups: ['168207050562602925'] 
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      // Warto zalogować błąd z MailerLite, żeby widzieć co poszło nie tak
      const errorData = await response.json();
      console.error('MailerLite Error:', errorData);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 400 });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
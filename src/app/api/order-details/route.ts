import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) return NextResponse.json({ error: 'Brak session_id' }, { status: 400 });

  const { data } = await supabase
    .from('orders')
    .select('assigned_vin')
    .eq('stripe_session_id', sessionId)
    .single();

  return NextResponse.json({ vin: data?.assigned_vin ?? null });
}
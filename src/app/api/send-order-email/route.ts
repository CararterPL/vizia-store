import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const PRINTER_EMAIL = 'vince@cararter.pl';

export async function POST(req: Request) {
  try {
    const { items, buyerData, invoiceData, deliveryMethod, selectedPoint, shippingAddress } = await req.json();

    const deliveryInfo = deliveryMethod === 'paczkomat'
      ? `Paczkomat: <strong>${selectedPoint?.name}</strong><br>${selectedPoint?.address_details?.street}, ${selectedPoint?.address_details?.city}`
      : `Kurier: <strong>${shippingAddress?.street}, ${shippingAddress?.zipCode} ${shippingAddress?.city}</strong>`;

    const invoiceInfo = invoiceData?.wantsInvoice
      ? `
        <tr><td colspan="2" style="padding:16px 0 8px;border-top:1px solid #333;">
          <span style="color:#ff133a;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">FAKTURA VAT</span>
        </td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#999;">Firma</td><td style="color:#fff;">${invoiceData.companyName}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#999;">NIP</td><td style="color:#fff;">${invoiceData.nip}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#999;">Adres</td><td style="color:#fff;">${invoiceData.street}, ${invoiceData.zipCode} ${invoiceData.city}</td></tr>
      `
      : `<tr><td colspan="2" style="padding:16px 0 4px;color:#555;border-top:1px solid #333;font-size:12px;">Klient nie chce faktury VAT</td></tr>`;

    const itemsHtml = items.map((item: any) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #222;vertical-align:top;">
          <strong style="color:#fff;font-size:15px;">${item.name}</strong><br>
          <span style="color:#ff133a;font-family:monospace;font-size:13px;">VIN: ${item.vin}</span><br>
          <span style="color:#999;font-size:12px;">Rozmiar: <strong style="color:#fff;">${item.size}</strong></span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #222;text-align:right;color:#fff;font-weight:bold;vertical-align:top;">
          ${item.price.toFixed(2)} PLN
        </td>
      </tr>
    `).join('');

    const totalPrice = items.reduce((sum: number, item: any) => sum + item.price, 0);

    const html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#000;font-family:Arial,sans-serif;color:#fff;">
        <div style="max-width:600px;margin:0 auto;padding:40px 24px;">

          <div style="border-bottom:2px solid #ff133a;padding-bottom:20px;margin-bottom:32px;">
            <h1 style="color:#fff;margin:0;font-size:32px;letter-spacing:4px;">VIZIA</h1>
            <p style="color:#ff133a;margin:6px 0 0;font-size:10px;letter-spacing:4px;text-transform:uppercase;">Nowe zamówienie do realizacji</p>
          </div>

          <table style="width:100%;border-collapse:collapse;">

            <tr>
              <td colspan="2" style="padding:0 0 12px;">
                <span style="color:#ff133a;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">Zamówione produkty</span>
              </td>
            </tr>

            ${itemsHtml}

            <tr>
              <td style="padding:16px 0 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Suma</td>
              <td style="padding:16px 0 0;text-align:right;color:#fff;font-size:22px;font-weight:bold;">${totalPrice.toFixed(2)} PLN</td>
            </tr>

            <tr>
              <td colspan="2" style="padding:24px 0 12px;border-top:1px solid #333;margin-top:8px;">
                <span style="color:#ff133a;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">Dane klienta</span>
              </td>
            </tr>
            <tr><td style="padding:4px 16px 4px 0;color:#999;">Imię i nazwisko</td><td style="color:#fff;">${buyerData.firstName} ${buyerData.lastName}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#999;">E-mail</td><td style="color:#fff;">${buyerData.email}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#999;">Telefon</td><td style="color:#fff;">${buyerData.phone}</td></tr>

            <tr>
              <td colspan="2" style="padding:24px 0 12px;border-top:1px solid #333;">
                <span style="color:#ff133a;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">Dostawa</span>
              </td>
            </tr>
            <tr><td colspan="2" style="color:#fff;padding-bottom:8px;line-height:1.6;">${deliveryInfo}</td></tr>

            ${invoiceInfo}

          </table>

          <div style="margin-top:48px;padding-top:20px;border-top:1px solid #1a1a1a;text-align:center;">
            <p style="color:#333;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0;">VIZIA WEAR // ${new Date().getFullYear()}</p>
          </div>

        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: 'VIZIA Store <zamowienia@send.viziawear.com>',
      to: PRINTER_EMAIL,
      subject: `🏎️ Nowe zamówienie — ${items.map((i: any) => i.vin).join(', ')}`,
      html,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Send email error:', err);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}
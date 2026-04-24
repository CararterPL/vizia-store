import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const PRINTER_EMAIL = 'biuro@vipermedia.pl';
const COPY_EMAIL = ['vince@cararter.pl', 'biuro@ihaft.pl'];

export async function POST(req: Request) {
  try {
    const { items, buyerData, invoiceData, deliveryMethod, selectedPoint, shippingAddress } = await req.json();

    const orderDate = new Date().toLocaleString('pl-PL', {
      timeZone: 'Europe/Warsaw',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    const totalPrice = items.reduce((sum: number, item: any) => sum + item.price, 0);

    const deliveryText = deliveryMethod === 'paczkomat'
      ? `Paczkomat InPost: ${selectedPoint?.name || 'N/A'}`
      : `Kurier: ${shippingAddress?.street || ''}, ${shippingAddress?.zipCode || ''} ${shippingAddress?.city || ''}`;

    const invoiceText = invoiceData?.wantsInvoice
      ? `
        <tr><td colspan="2" style="padding:16px 0 8px;border-top:1px solid #e0e0e0;">
          <strong style="font-size:11px;letter-spacing:2px;text-transform:uppercase;">FAKTURA VAT</strong>
        </td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#666;">Firma</td><td>${invoiceData.companyName}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#666;">NIP</td><td>${invoiceData.nip}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#666;">Adres</td><td>${invoiceData.street}, ${invoiceData.zipCode} ${invoiceData.city}</td></tr>
      `
      : `<tr><td colspan="2" style="padding:16px 0 4px;color:#666;border-top:1px solid #e0e0e0;font-size:12px;">Klient nie chce faktury VAT</td></tr>`;

    const itemsHtml = items.map((item: any) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e0e0e0;vertical-align:top;">
          <strong style="font-size:14px;">${item.name}</strong><br>
          <span style="font-family:monospace;font-size:12px;">VIN: ${item.vin}</span><br>
          <span style="color:#666;font-size:12px;">Rozmiar: ${item.size}</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #e0e0e0;text-align:right;font-weight:bold;vertical-align:top;">
          ${item.price.toFixed(2)} PLN
        </td>
      </tr>
    `).join('');

    // ============================================
    // MAIL DO DRUKARNI (jasny, eko)
    // ============================================
    const printerHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#fff;font-family:Arial,sans-serif;color:#000;font-size:13px;">
        <div style="max-width:600px;margin:0 auto;padding:32px 24px;">

          <div style="border-bottom:2px solid #000;padding-bottom:16px;margin-bottom:24px;">
            <h1 style="margin:0;font-size:24px;letter-spacing:4px;">VIZIA</h1>
            <p style="margin:4px 0 0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#666;">
              Nowe zamówienie do realizacji
            </p>
          </div>

          <table style="width:100%;border-collapse:collapse;">

            <tr>
              <td colspan="2" style="padding:0 0 4px;">
                <span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">
                  Data zamówienia
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding:0 0 20px;color:#333;font-family:monospace;">
                ${orderDate}
              </td>
            </tr>

            <tr>
              <td colspan="2" style="padding:0 0 8px;border-top:1px solid #e0e0e0;padding-top:16px;">
                <span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">
                  Zamówione produkty
                </span>
              </td>
            </tr>
            ${itemsHtml}
            <tr>
              <td style="padding:12px 0 0;color:#666;font-size:11px;text-transform:uppercase;">Suma</td>
              <td style="padding:12px 0 0;text-align:right;font-size:18px;font-weight:bold;">${totalPrice.toFixed(2)} PLN</td>
            </tr>

            <tr>
              <td colspan="2" style="padding:20px 0 8px;border-top:1px solid #e0e0e0;">
                <span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">
                  Dane klienta
                </span>
              </td>
            </tr>
            <tr><td style="padding:4px 16px 4px 0;color:#666;">Imię i nazwisko</td><td>${buyerData.firstName} ${buyerData.lastName}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#666;">E-mail</td><td>${buyerData.email}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#666;">Telefon</td><td>${buyerData.phone}</td></tr>

            <tr>
              <td colspan="2" style="padding:20px 0 8px;border-top:1px solid #e0e0e0;">
                <span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">
                  Dostawa
                </span>
              </td>
            </tr>
            <tr><td colspan="2" style="padding-bottom:8px;">${deliveryText}</td></tr>

            ${invoiceText}

          </table>

          <div style="margin-top:40px;padding-top:16px;border-top:1px solid #e0e0e0;text-align:center;">
            <p style="color:#999;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin:0;">
              VIZIA WEAR // ${new Date().getFullYear()}
            </p>
          </div>

        </div>
      </body>
      </html>
    `;

    // ============================================
    // MAIL DO KLIENTA (czarny, stylowy)
    // ============================================
    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#000;font-family:Arial,sans-serif;color:#fff;">
        <div style="max-width:600px;margin:0 auto;padding:40px 24px;">

          <div style="border-bottom:2px solid #ff133a;padding-bottom:20px;margin-bottom:32px;">
            <h1 style="color:#fff;margin:0;font-size:32px;letter-spacing:6px;">VIZIA</h1>
            <p style="color:#ff133a;margin:6px 0 0;font-size:10px;letter-spacing:4px;text-transform:uppercase;">
              Potwierdzenie zamówienia
            </p>
          </div>

          <p style="color:#ccc;font-size:14px;line-height:1.6;margin:0 0 32px;">
            Cześć <strong style="color:#fff;">${buyerData.firstName}</strong>,<br><br>
            Twoje zamówienie zostało przyjęte. Koszulka jest produkowana na zamówienie — 
            każda sztuka drukowana indywidualnie. Dajemy znać gdy wyruszy w drogę.
          </p>

          <table style="width:100%;border-collapse:collapse;">

            <tr>
              <td colspan="2" style="padding:0 0 12px;">
                <span style="color:#ff133a;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">
                  Twoje zamówienie
                </span>
              </td>
            </tr>

            ${items.map((item: any) => `
              <tr>
                <td style="padding:16px 0;border-bottom:1px solid #222;vertical-align:top;">
                  <strong style="color:#fff;font-size:14px;">${item.name}</strong><br>
                  <span style="color:#ff133a;font-family:monospace;font-size:13px;letter-spacing:2px;">
                    VIN: ${item.vin}
                  </span><br>
                  <span style="color:#666;font-size:12px;">Rozmiar: ${item.size}</span>
                </td>
                <td style="padding:16px 0;border-bottom:1px solid #222;text-align:right;color:#fff;font-weight:bold;vertical-align:top;">
                  ${item.price.toFixed(2)} PLN
                </td>
              </tr>
            `).join('')}

            <tr>
              <td style="padding:16px 0 0;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px;">
                Suma
              </td>
              <td style="padding:16px 0 0;text-align:right;color:#fff;font-size:20px;font-weight:bold;">
                ${totalPrice.toFixed(2)} PLN
              </td>
            </tr>

            <tr>
              <td colspan="2" style="padding:24px 0 12px;border-top:1px solid #222;">
                <span style="color:#ff133a;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">
                  Dostawa
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="color:#ccc;font-size:13px;padding-bottom:8px;line-height:1.6;">
                ${deliveryText}
              </td>
            </tr>

          </table>

          <div style="margin-top:32px;padding:20px;border:1px solid #222;background:#0a0a0a;">
            <p style="color:#666;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">
              Czas realizacji
            </p>
            <p style="color:#fff;font-size:13px;margin:0;line-height:1.6;">
              7–14 dni roboczych. Dostawa wliczona w cenę.<br>
              <span style="color:#666;font-size:11px;">
                Pytania? Napisz na 
                <a href="mailto:vince@cararter.pl" style="color:#ff133a;">vince@cararter.pl</a>
              </span>
            </p>
          </div>

          <div style="margin-top:48px;padding-top:20px;border-top:1px solid #111;text-align:center;">
            <p style="color:#333;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0;">
              VIZIA WEAR // ${new Date().getFullYear()}
            </p>
          </div>

        </div>
      </body>
      </html>
    `;

    // Wyślij do drukarni + kopia
    await resend.emails.send({
      from: 'VIZIA Store <zamowienia@send.viziawear.com>',
      to: PRINTER_EMAIL,
      cc: COPY_EMAIL,
      subject: `Zamówienie VIZIA — ${items.map((i: any) => i.vin).join(', ')} — ${orderDate}`,
      html: printerHtml,
    });

    // Wyślij do klienta
    await resend.emails.send({
      from: 'VIZIA Store <zamowienia@send.viziawear.com>',
      replyTo: 'vince@cararter.pl',
      to: buyerData.email,
      subject: `Twoje zamówienie VIZIA — VIN: ${items.map((i: any) => i.vin).join(', ')}`,
      html: customerHtml,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Send email error:', err);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}
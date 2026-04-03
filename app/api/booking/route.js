import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email, service, occasion, date, venue, guests, message } = body;

    // Send email to the client (SLV Events owner)
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Must be verified domain in Resend
      to: process.env.OWNER_EMAIL || 'sm4686771@gmail.com', // Client's email
      subject: `🎉 New Booking Enquiry — ${name} | SLV Events`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 32px; border-radius: 12px;">
          <div style="background: #f95738; color: white; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h2 style="margin: 0; font-size: 22px;">New Booking Enquiry 🎉</h2>
            <p style="margin: 4px 0 0; opacity: 0.8; font-size: 14px;">Via slvevents.in</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
            <tr style="background: #fafafa;">
              <td style="padding: 12px 16px; color: #666; font-size: 13px; width: 140px; border-bottom: 1px solid #eee;">Name</td>
              <td style="padding: 12px 16px; font-weight: 600; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #666; font-size: 13px; border-bottom: 1px solid #eee;">Phone</td>
              <td style="padding: 12px 16px; font-weight: 600; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #f95738;">${phone}</a></td>
            </tr>
            <tr style="background: #fafafa;">
              <td style="padding: 12px 16px; color: #666; font-size: 13px; border-bottom: 1px solid #eee;">Email</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #eee;">${email || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #666; font-size: 13px; border-bottom: 1px solid #eee;">Service</td>
              <td style="padding: 12px 16px; font-weight: 600; color: #f95738; border-bottom: 1px solid #eee;">${service || 'Not specified'}</td>
            </tr>
            <tr style="background: #fafafa;">
              <td style="padding: 12px 16px; color: #666; font-size: 13px; border-bottom: 1px solid #eee;">Occasion</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #eee;">${occasion || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #666; font-size: 13px; border-bottom: 1px solid #eee;">Event Date</td>
              <td style="padding: 12px 16px; font-weight: 600; border-bottom: 1px solid #eee;">${date}</td>
            </tr>
            <tr style="background: #fafafa;">
              <td style="padding: 12px 16px; color: #666; font-size: 13px; border-bottom: 1px solid #eee;">Venue / Area</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #eee;">${venue}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #666; font-size: 13px; border-bottom: 1px solid #eee;">Guests</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #eee;">${guests || 'Not specified'}</td>
            </tr>
            ${message ? `
            <tr style="background: #fafafa;">
              <td style="padding: 12px 16px; color: #666; font-size: 13px; vertical-align: top;">Notes</td>
              <td style="padding: 12px 16px; line-height: 1.6;">${message}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 20px; background: #fff8f7; border: 1px solid #ffddd8; padding: 16px; border-radius: 8px;">
            <p style="margin: 0; font-size: 13px; color: #666;">
              ⚡ Call <strong>${name}</strong> at <a href="tel:${phone}" style="color: #f95738;">${phone}</a> within 2 hours to confirm their booking.
            </p>
          </div>

          <p style="color: #bbb; font-size: 12px; text-align: center; margin-top: 24px;">
            SLV Events · slvevents.in · Bangalore
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Booking API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

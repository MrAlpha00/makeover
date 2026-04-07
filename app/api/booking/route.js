import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const customerEmailHtml = (name, service, date, venue, phone) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed - Party Hub</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
  
  <!-- Preview Text -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    Your booking is confirmed! We'll reach out to you soon.
  </div>
  
  <!-- Wrapper Table -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        
        <!-- Main Card -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08);">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #f95738 0%, #ff6b4a 100%); padding: 40px 40px 50px; text-align: center; position: relative;">
              
              <!-- Confetti decoration -->
              <div style="position: absolute; top: 20px; left: 30px; font-size: 24px;">🎉</div>
              <div style="position: absolute; top: 30px; right: 40px; font-size: 20px;">✨</div>
              <div style="position: absolute; bottom: 25px; left: 50px; font-size: 18px;">🎊</div>
              
              <!-- Logo -->
              <div style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 12px; padding: 12px 20px; margin-bottom: 20px;">
                <span style="color: white; font-size: 24px; font-weight: bold;">Party Hub</span>
              </div>
              
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; line-height: 1.2;">
                Booking Confirmed! 🎉
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 16px 0 0; font-size: 16px;">
                Thank you for choosing us, ${name}!
              </p>
            </td>
          </tr>
          
          <!-- Success Icon -->
          <tr>
            <td style="text-align: center; padding: 30px;">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); border-radius: 50%; box-shadow: 0 8px 24px rgba(74, 222, 128, 0.4);">
                <span style="font-size: 40px;">✓</span>
              </div>
            </td>
          </tr>
          
          <!-- Confirmation Message -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <h2 style="color: #1a1a1a; margin: 0 0 12px; font-size: 24px; font-weight: 600;">
                We'll Reach You Soon!
              </h2>
              <p style="color: #666666; margin: 0; font-size: 16px; line-height: 1.6;">
                Our team at Party Hub will contact you within <strong style="color: #f95738;">2 hours</strong> to confirm your booking details and answer any questions.
              </p>
            </td>
          </tr>
          
          <!-- Booking Details Card -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #fff9f8 0%, #fff5f3 100%); border-radius: 16px; border: 1px solid #ffddd8; overflow: hidden;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="color: #f95738; margin: 0 0 20px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                      📋 Your Booking Details
                    </h3>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ffebe7;">
                          <span style="color: #888888; font-size: 14px;">Service</span>
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ffebe7; text-align: right;">
                          <strong style="color: #1a1a1a; font-size: 15px;">${service || 'Custom Decoration'}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ffebe7;">
                          <span style="color: #888888; font-size: 14px;">Event Date</span>
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ffebe7; text-align: right;">
                          <strong style="color: #1a1a1a; font-size: 15px;">${date ? new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'To be confirmed'}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0;">
                          <span style="color: #888888; font-size: 14px;">Venue</span>
                        </td>
                        <td style="padding: 10px 0; text-align: right;">
                          <strong style="color: #1a1a1a; font-size: 15px;">${venue}</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- What to Expect -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h3 style="color: #1a1a1a; margin: 0 0 16px; font-size: 18px; font-weight: 600;">
                What Happens Next? 🚀
              </h3>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding: 12px 0; vertical-align: top;">
                    <div style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: #f95738; border-radius: 50%; margin-right: 12px;">
                      <span style="color: white; font-size: 14px; font-weight: 600;">1</span>
                    </div>
                    <strong style="color: #1a1a1a; font-size: 15px;">Confirmation Call</strong>
                    <p style="color: #666666; margin: 4px 0 0 44px; font-size: 14px; line-height: 1.5;">We'll call you to confirm all details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; vertical-align: top;">
                    <div style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: #f95738; border-radius: 50%; margin-right: 12px;">
                      <span style="color: white; font-size: 14px; font-weight: 600;">2</span>
                    </div>
                    <strong style="color: #1a1a1a; font-size: 15px;">Customization</strong>
                    <p style="color: #666666; margin: 4px 0 0 44px; font-size: 14px; line-height: 1.5;">Discuss themes, colors & add-ons</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; vertical-align: top;">
                    <div style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: #f95738; border-radius: 50%; margin-right: 12px;">
                      <span style="color: white; font-size: 14px; font-weight: 600;">3</span>
                    </div>
                    <strong style="color: #1a1a1a; font-size: 15px;">Magic Setup</strong>
                    <p style="color: #666666; margin: 4px 0 0 44px; font-size: 14px; line-height: 1.5;">We arrive early & create the magic!</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="https://wa.me/6366883984?text=Hi%20SLV%20Events!%20I%20just%20submitted%20a%20booking%20for%20${encodeURIComponent(service || 'decoration')}.%20Looking%20forward%20to%20hearing%20from%20you!" 
                 style="display: inline-block; background: linear-gradient(135deg, #f95738 0%, #ff6b4a 100%); color: white; text-decoration: none; font-size: 16px; font-weight: 600; padding: 16px 40px; border-radius: 50px; box-shadow: 0 8px 24px rgba(249, 87, 56, 0.4);">
                💬 Chat with Us on WhatsApp
              </a>
              <p style="color: #888888; margin: 16px 0 0; font-size: 14px;">
                Quick response guaranteed!
              </p>
            </td>
          </tr>
          
          <!-- Why Choose Us -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #f8f8f8; border-radius: 16px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="color: #1a1a1a; margin: 0 0 16px; font-size: 15px; font-weight: 600; text-align: center;">
                      Why Book with Party Hub? ✨
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #666666; width: 50%;">
                          ✓ 5000+ Events Decorated
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                          ✓ Same-Day Setup Available
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                          ✓ 100% Customizable
                        </td>
                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">
                          ✓ No Hidden Charges
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Need Help Section -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 16px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="color: white; margin: 0 0 16px; font-size: 16px; font-weight: 600;">
                      Need Immediate Assistance?
                    </p>
                    <a href="tel:+916366883984" style="display: inline-block; color: #f95738; text-decoration: none; font-size: 20px; font-weight: 700;">
                      📞 +91 96638 66778
                    </a>
                    <p style="color: rgba(255,255,255,0.5); margin: 12px 0 0; font-size: 13px;">
                      Available Mon-Sun, 9 AM - 9 PM
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px 40px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="color: #888888; margin: 0 0 8px; font-size: 14px;">
                Thank you for trusting <strong style="color: #f95738;">Party Hub</strong>
              </p>
              <p style="color: #aaaaaa; margin: 0; font-size: 12px;">
                Bangalore's Premier Party Decorators
              </p>
              <p style="color: #cccccc; margin: 16px 0 0; font-size: 11px;">
                This is an automated confirmation. Please don't reply to this email.
              </p>
            </td>
          </tr>
          
        </table>
        <!-- End Main Card -->
        
        <!-- Social Links -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; margin-top: 30px;">
          <tr>
            <td style="text-align: center; padding: 20px;">
              <p style="color: #888888; margin: 0 0 16px; font-size: 14px;">Follow us for more inspiration</p>
              <a href="https://instagram.com/slvevents" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: #f9f9f9; border-radius: 50%; font-size: 18px;">📸</span>
              </a>
              <a href="https://facebook.com/slvevents" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: #f9f9f9; border-radius: 50%; font-size: 18px;">📘</span>
              </a>
              <a href="https://wa.me/6366883984" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: #f9f9f9; border-radius: 50%; font-size: 18px;">💬</span>
              </a>
            </td>
          </tr>
        </table>
        
        <!-- Copyright -->
        <p style="color: #bbbbbb; font-size: 12px; margin: 0; padding-top: 10px;">
          © 2026 Party Hub. All rights reserved. | Bangalore, India
        </p>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
`;

const ownerEmailHtml = (name, phone, email, service, occasion, date, venue, guests, message) => `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 32px; border-radius: 12px;">
  <div style="background: linear-gradient(135deg, #f95738 0%, #ff6b4a 100%); color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
    <h2 style="margin: 0; font-size: 24px; font-weight: 700;">🎉 New Booking Enquiry!</h2>
    <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">Via partyhubs.in</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <tr style="background: #fafafa;">
      <td style="padding: 14px 16px; color: #888; font-size: 13px; width: 140px; border-bottom: 1px solid #eee;">Name</td>
      <td style="padding: 14px 16px; font-weight: 600; border-bottom: 1px solid #eee;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 14px 16px; color: #888; font-size: 13px; border-bottom: 1px solid #eee;">Phone</td>
      <td style="padding: 14px 16px; font-weight: 600; border-bottom: 1px solid #eee;">
        <a href="tel:${phone}" style="color: #f95738; text-decoration: none;">${phone}</a>
        <a href="https://wa.me/${phone}" style="display: inline-block; margin-left: 8px; background: #25D366; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; text-decoration: none;">💬 WhatsApp</a>
      </td>
    </tr>
    <tr style="background: #fafafa;">
      <td style="padding: 14px 16px; color: #888; font-size: 13px; border-bottom: 1px solid #eee;">Email</td>
      <td style="padding: 14px 16px; border-bottom: 1px solid #eee;">
        ${email ? `<a href="mailto:${email}" style="color: #f95738;">${email}</a>` : '<span style="color: #ccc;">Not provided</span>'}
      </td>
    </tr>
    <tr>
      <td style="padding: 14px 16px; color: #888; font-size: 13px; border-bottom: 1px solid #eee;">Service</td>
      <td style="padding: 14px 16px; font-weight: 600; color: #f95738; border-bottom: 1px solid #eee;">${service || 'Not specified'}</td>
    </tr>
    <tr style="background: #fafafa;">
      <td style="padding: 14px 16px; color: #888; font-size: 13px; border-bottom: 1px solid #eee;">Occasion</td>
      <td style="padding: 14px 16px; border-bottom: 1px solid #eee;">${occasion || 'Not specified'}</td>
    </tr>
    <tr>
      <td style="padding: 14px 16px; color: #888; font-size: 13px; border-bottom: 1px solid #eee;">Event Date</td>
      <td style="padding: 14px 16px; font-weight: 600; border-bottom: 1px solid #eee;">${date ? new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified'}</td>
    </tr>
    <tr style="background: #fafafa;">
      <td style="padding: 14px 16px; color: #888; font-size: 13px; border-bottom: 1px solid #eee;">Venue / Area</td>
      <td style="padding: 14px 16px; border-bottom: 1px solid #eee;">${venue}</td>
    </tr>
    <tr>
      <td style="padding: 14px 16px; color: #888; font-size: 13px; border-bottom: 1px solid #eee;">Guests</td>
      <td style="padding: 14px 16px; border-bottom: 1px solid #eee;">${guests || 'Not specified'}</td>
    </tr>
    ${message ? `
    <tr style="background: #fafafa;">
      <td style="padding: 14px 16px; color: #888; font-size: 13px; vertical-align: top;">Special Requests</td>
      <td style="padding: 14px 16px; line-height: 1.6;">${message}</td>
    </tr>` : ''}
  </table>

  <div style="margin-top: 24px; background: linear-gradient(135deg, #fff9f8 0%, #fff5f3 100%); border: 1px solid #ffddd8; padding: 20px; border-radius: 12px; text-align: center;">
    <p style="margin: 0 0 12px; font-size: 14px; color: #666;">
      ⚡ <strong>Action Required</strong>
    </p>
    <p style="margin: 0 0 16px; font-size: 13px; color: #888;">
      Contact <strong>${name}</strong> within <span style="color: #f95738; font-weight: 600;">2 hours</span> to confirm their booking!
    </p>
    <a href="tel:${phone}" style="display: inline-block; background: #f95738; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-right: 8px;">
      📞 Call Now
    </a>
    <a href="https://wa.me/${phone}" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
      💬 WhatsApp
    </a>
  </div>

  <p style="color: #bbb; font-size: 12px; text-align: center; margin-top: 24px;">
    Party Hub · partyhubs.in · Bangalore
  </p>
</div>
`;

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email, service, occasion, date, venue, guests, message } = body;

    const ownerEmail = process.env.OWNER_EMAIL || 'sm4686771@gmail.com';

    // Send email to the client (Party Hub owner)
    const { error: ownerError } = await resend.emails.send({
      from: 'Party Hub <onboarding@resend.dev>',
      to: ownerEmail,
      subject: `🎉 New Booking — ${name} | ${service || 'Custom'} | ${date}`,
      html: ownerEmailHtml(name, phone, email, service, occasion, date, venue, guests, message),
    });

    if (ownerError) {
      console.error('Owner email error:', ownerError);
    }

    // Send confirmation email to customer (if email provided)
    if (email) {
      const { error: customerError } = await resend.emails.send({
        from: 'Party Hub <onboarding@resend.dev>',
        to: email,
        subject: `✅ Booking Confirmed! We'll reach you soon, ${name}!`,
        html: customerEmailHtml(name, service, date, venue, phone),
      });

      if (customerError) {
        console.error('Customer email error:', customerError);
        // Don't fail the whole request if customer email fails
      }
    }

    // Insert into Supabase bookings table
    const { supabaseAdmin } = await import('@/lib/supabase-admin');
    const { error: dbError } = await supabaseAdmin.from('bookings').insert({
      name,
      phone,
      email,
      service,
      occasion,
      event_date: date,
      venue,
      guests: String(guests),
      message,
      status: 'new'
    });

    if (dbError) {
      console.error('Supabase DB error:', dbError);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Booking API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

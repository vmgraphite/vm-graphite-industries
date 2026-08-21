import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      message: 'VM Graphite Commercial Quote API Endpoint. Direct inquiries routed to info@vmgraphiteindustries.com.',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const {
      product,
      category,
      name,
      company,
      email,
      phone,
      quantity,
      specifications,
      timeline,
      message,
      honeypot,
    } = data;

    // Spam honeypot validation
    if (honeypot) {
      return new Response(JSON.stringify({ success: true, message: 'Inquiry received.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Input validation
    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields: Name, Email, or Phone.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const destinationEmail = import.meta.env.CONTACT_EMAIL || 'info@vmgraphiteindustries.com';

    // Log formatted inquiry payload
    console.log('=== NEW INDUSTRIAL QUOTE INQUIRY RECEIVED ===');
    console.log(`Target Email: ${destinationEmail}`);
    console.log(`Product: ${product || 'General Inquiry'}`);
    console.log(`Category: ${category || 'N/A'}`);
    console.log(`Client Name: ${name}`);
    console.log(`Company: ${company || 'Not Provided'}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Quantity: ${quantity || 'Not Specified'}`);
    console.log(`Timeline: ${timeline || 'Standard'}`);
    console.log(`Specifications: ${specifications || 'None'}`);
    console.log(`Message: ${message || 'None'}`);
    console.log('============================================');

    // Attempt direct relay to FormSubmit
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(destinationEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `[Quote Request] ${product || 'Commercial Inquiry'} - ${company || name}`,
          _replyto: email,
          _template: 'table',
          _captcha: 'false',
          'Product / Solution': product || 'General Inquiry',
          'Category': category || 'Industrial Graphite',
          'Quantity Required': quantity || 'Standard requirement',
          'Delivery Timeline': timeline || 'Standard',
          'Client Name': name,
          'Company Name': company || 'Not Provided',
          'Work Email': email,
          'Phone / WhatsApp': phone,
          'Technical Specifications': specifications || 'None specified',
          'Inquiry Details': message || 'No additional message',
          'Submitted At': new Date().toISOString(),
        }),
      });
    } catch (relayErr) {
      console.warn('FormSubmit server relay warning (logged locally):', relayErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your inquiry has been successfully submitted to VM Graphite Industries LLP.',
        destination: destinationEmail,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('API Quote Handler Error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error processing quote request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};


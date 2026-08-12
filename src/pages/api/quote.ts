import type { APIRoute } from 'astro';

export const prerender = false; // Serverless endpoint

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      message: 'VM Graphite Commercial Quote API Endpoint. Please send inquiries via POST request.',
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

    const destinationEmail = import.meta.env.CONTACT_EMAIL || 'kanikaagrawal1997@gmail.com';

    // Log formatted inquiry payload for serverless handler
    console.log('=== NEW INDUSTRIAL QUOTE INQUIRY RECEIVED ===');
    console.log(`Target Email: ${destinationEmail}`);
    console.log(`Product: ${product || 'General Inquiry'}`);
    console.log(`Category: ${category || 'N/A'}`);
    console.log(`Client Name: ${name}`);
    console.log(`Company: ${company || 'Not Provided'}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Quantity: ${quantity || 'Not Specified'}`);
    console.log(`Specifications: ${specifications || 'None'}`);
    console.log(`Message: ${message || 'None'}`);
    console.log('============================================');

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

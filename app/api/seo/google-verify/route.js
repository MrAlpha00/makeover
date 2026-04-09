export async function GET() {
  return new Response('google-site-verification: google123456789.html', {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

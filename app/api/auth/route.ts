import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shop = searchParams.get('shop');

  if (!shop) {
    return NextResponse.json({ error: 'Missing shop parameter' }, { status: 400 });
  }

  // Construct the OAuth URL
  const scopes = process.env.SCOPES || 'read_orders,write_orders';
  const redirectUri = `${process.env.HOST}/api/auth/callback`;
  const nonce = Date.now().toString();
  
  const authUrl = `https://${shop}/admin/oauth/authorize?` +
    `client_id=${process.env.SHOPIFY_API_KEY}` +
    `&scope=${scopes}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=${nonce}`;

  // Redirect to Shopify OAuth
  return NextResponse.redirect(authUrl);
}
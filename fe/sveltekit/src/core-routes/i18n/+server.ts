import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { locale } = await request.json();
  if (locale) {
    cookies.set('locale', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
      httpOnly: true,
      // secure: process.env.ENV === 'production',
    });
  }
  return new Response(null, { status: 204 });
};
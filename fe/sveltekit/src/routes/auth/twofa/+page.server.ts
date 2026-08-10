import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Request } from './$types';

export const load: PageServerLoad = async ({ request }: { request: Request }) => {
	if (await auth.api.getSession({ headers: request.headers })) throw redirect(303, `/`);
	return {};
};
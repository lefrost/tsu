import { env } from '$app/env/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	return {
		user: event.locals.user
	};
};

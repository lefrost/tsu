import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$paraglide/generated/runtime';

export const reroute: Reroute = (request) => deLocalizeUrl(request.url).pathname;

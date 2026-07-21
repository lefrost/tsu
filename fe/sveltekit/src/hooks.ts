import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '@tsu/all/paraglide/runtime';

export const reroute: Reroute = (request) => deLocalizeUrl(request.url).pathname;

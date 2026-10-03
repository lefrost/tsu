import type { Reroute } from '@sveltejs/kit/hooks';
import { deLocalizeUrl } from '$paraglide/generated/runtime';

export const reroute: Reroute = (request) => deLocalizeUrl(request.url).pathname;

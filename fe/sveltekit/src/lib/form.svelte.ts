// import { goto } from '$app/navigation';
import { jobs } from '$lib/runtime.svelte';
import { getLocale } from '$paraglide/generated/runtime';
import { m } from '$paraglide/generated/messages';

export function formCreate(options?: { onSuccess?: () => void; job?: string }) {
  let data = $state<{ error?: string, message?: string, success?: boolean, updated?: boolean }>({});

  function enhance() {
    if (options?.job) jobs.add(options.job);

    return async ({ result }: { result: any }) => {
      let locale = getLocale();
      if (options?.job) jobs.delete(options.job);

      if (result.type === `error`) {
        data = { success: false, error: result.error?.message || m.unknownError({}, { locale } as any) };
      } else if (result.type === `failure`) {
        data = { success: false, error: result.data?.message || m.unknownError({}, { locale } as any) };
      } else if (result.type === `redirect`) {
        window.location = result.location;
      } else {
        data = { success: true, message: result.data?.message };
        if (options?.onSuccess) await options.onSuccess();
      }
      
      data.updated = true;
    };
  }

  return {
    enhance,
    get loading() { return jobs.has(options?.job as string); },
    get error() { return data.error; },
    get message() { return data.message; },
    get success() { return data.success; },
    get updated() { return data.updated; }
  };
}
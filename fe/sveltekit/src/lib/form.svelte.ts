// import { goto } from '$app/navigation';
import { jobs } from '$lib/runtime.svelte';

export function formCreate(options?: { onSuccess?: () => void; job?: string }) {
  let data = $state<{ message?: string, success?: boolean }>({});

  function enhance() {
    if (options?.job) jobs.add(options.job);

    return async ({ result }: { result: any }) => {
      if (options?.job) jobs.delete(options.job);

      if (result.type === `error`) {
        data = { message: result.error?.message || `An error occurred` };
      } else if (result.type === `failure`) {
        data = { message: result.data?.message || `An error occurred` };
      } else if (result.type === `redirect`) {
        window.location = result.location;
      } else {
        data = { success: true, message: result.data?.message };
        if (options?.onSuccess) await options.onSuccess();
      }
    };
  }

  return {
    enhance,
    get loading() { return jobs.has(options?.job as string); },
    get message() { return data.message; },
    get success() { return data.success; }
  };
}
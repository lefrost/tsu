import { goto } from '$app/navigation';

export function formCreate(options?: { onSuccess?: () => void }) {
  let data = $state<{ message?: string, success?: boolean }>({});

  function enhance() {
    return async ({ result }: { result: any }) => {
      if (result.type === `error`) {
        data = { message: result.error?.message || `An error occurred` };
      } else if (result.type === `failure`) {
        data = { message: result.data?.message || `An error occurred` };
      } else if (result.type === `redirect`) {
        await goto(result.location);
      } else {
        data = { success: true, message: result.data?.message };
        if (options?.onSuccess) await options.onSuccess();
      }
    };
  }

  return {
    get message() { return data.message; },
    get success() { return data.success; },
    enhance
  };
}
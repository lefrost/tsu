export function formCreate() {
  let data = $state<{ message?: string, success?: boolean }>({});

  function enhance() {
    return ({ result }: { result: any }) => {
      if (result.type === `error`) {
        data = { message: result.error?.message || `An error occurred` };
      } else if (result.type === `failure`) {
        data = { message: result.data?.message || `An error occurred` };
      } else {
        data = {};
        data.success = result.success;
      }
    };
  }

  return {
    get message() { return data.message; },
    get success() { return data.success; },
    enhance
  };
}
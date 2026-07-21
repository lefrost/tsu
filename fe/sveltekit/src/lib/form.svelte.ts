export function formCreate() {
  let data = $state<{ message?: string }>({});

  function enhance() {
    return ({ result }: { result: any }) => {
      if (result.type === `error`) {
        data = { message: result.error?.message || `An error occurred` };
      } else if (result.type === `failure`) {
        data = { message: result.data?.message || `An error occurred` };
      } else {
        data = {};
      }
    };
  }

  return {
    get message() { return data.message; },
    enhance
  };
}
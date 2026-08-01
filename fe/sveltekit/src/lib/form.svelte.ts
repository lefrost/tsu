import { jobs } from '$lib/runtime.svelte';
import { getLocale } from '$paraglide/generated/runtime';
import { m } from '$paraglide/generated/messages';

export function formCreate(ops?: {
  job?: string,
  onOk?: () => void
}) {
  let dat = $state<{
    er?: string,
    msg?: string,
    ok?: boolean,
    up?: boolean
  }>({});

  function enhance() {
    if (ops?.job) jobs.add(ops.job);

    dat = {};

    return async ({ result }: { result: any }) => {
      let loc = getLocale();
      if (ops?.job) jobs.delete(ops.job);

      if (result.type === `error`) dat = {
        er: result.error?.msg || m.unknownError({}, { loc } as any),
        ok: false,
        up: true
      };

      else if (result.type === `failure`) dat = {
        er: result.data?.msg || m.unknownError({}, { loc } as any),
        ok: false,
        up: true
      };

      else if (result.type === `redirect`) window.location = result.location;

      else {
        dat = {
          ...result.data,
          msg: result.data?.msg,
          ok: true,
          up: true
        };

        if (ops?.onOk) await ops.onOk();
      }
    };
  }

  return {
    get dat() { return dat; },
    enhance,
    get loading() { return jobs.has(ops?.job as string); },
    get er() { return dat.er; },
    get msg() { return dat.msg; },
    get ok() { return dat.ok; },
    get up() { return dat.up; }
  };
}

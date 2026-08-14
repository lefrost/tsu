import { translations } from '$all/betterauth/i18n';
import { m } from '$paraglide/generated/messages';

export function erMsgGet(er: any, loc: string) {
  loc = loc in translations ? loc : `en`;
  if (!er) return m.unknownError({}, { loc } as any);

  const locEntry = translations[loc as keyof typeof translations];
  const msg = locEntry?.[(er as any).body?.code as keyof typeof locEntry & string];

  return msg || m.unknownError({}, { loc } as any)
}
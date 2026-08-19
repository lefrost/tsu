import { z } from 'zod';
import { m } from '$paraglide/generated/messages';

export const UserDetails = z.object({
  icon: z.instanceof(File)
    .refine(file => file.size === 0 || file.type.startsWith(`image/`), { message: m.userIconTypeInvalid({ mb: process.env.USER_ICON_MB_MAX as string }, { locale: `en` }) })
    .refine(file => file.size === 0 || !file || file.size <= Number(process.env.USER_ICON_MB_MAX) * 1024 * 1024, { message: m.userIconSizeExceed({ mb: process.env.USER_ICON_MB_MAX as string }, { locale: `en` }) })
    .transform(file => file.size === 0 ? null : file),
  iconPrevDel: z.string().transform(val => val === `true`)
});
import { translations } from '$all/betterauth/i18n';
import { beforeAll, describe, expect, it } from 'bun:test';
import { erMsgGet } from './util.server';
import { m } from '$paraglide/generated/messages';
import { overwriteGetLocale  } from '$paraglide/generated/runtime';

describe(`erMsgGet`, () => {
  beforeAll(() => overwriteGetLocale(() => `en`));

  it(`nullish er yields unknown er`, () => {
    expect(erMsgGet(null, `en`))
      .toBe(m.unknownError({}, { loc: `en` } as any));
  });

  it(`er code yields match in translation`, () => {
    expect(erMsgGet({ body: { code: `USER_NOT_FOUND` } }, `en`))
      .toBe(translations[`en`][`USER_NOT_FOUND`]);
  });

  it(`er code yields unknown er if no match in translations`, () => {
    expect(erMsgGet({ body: { code: `n/a` } }, 'en'))
      .toBe(m.unknownError({}, { loc: `en` } as any));
  });

  it(`invalid loc defaults to en`, () => {
    expect(erMsgGet({ body: { code: `USER_NOT_FOUND` } }, `n/a`))
      .toBe(translations[`en`][`USER_NOT_FOUND`]);
  });
});
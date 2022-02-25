import { type Schema } from 'mongoose';
import { i18n } from 'next-i18next';
import { xprod } from 'ramda';

export interface Translatable<T> {
  translate(locale?: string): T;
}

type Options = {
  paths: readonly string[];
  locales?: readonly string[];
};

export function translatePlugin(
  schema: Schema,
  { paths, locales = i18n?.languages ?? [] }: Options
) {
  schema.method('translate', function (locale) {
    const translated = this.toObject();

    paths.forEach(path => {
      translated[path] = this.get(`${path}_${locale}`) ?? translated[path];
    });

    return translated;
  });

  xprod(locales, paths).map(([locale, path]) => {
    schema.add({
      [`${path}_${locale}`]: {
        type: String,
      },
    });
  });
}

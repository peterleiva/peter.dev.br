import { HydratedDocument, Schema, StringSchemaDefinition } from 'mongoose';
import { mergeRight } from 'ramda';

export interface Translations {
  translations: { [lng: string]: TranslationEntry };
}

export interface Translate {
  translate: (locale: string) => { [attr: string]: TranslationEntry };
}

interface TranslationEntry<TEntry = string> {
  [key: string]: TEntry;
}

type TranslationEntryDefinition = TranslationEntry<StringSchemaDefinition>;

export type TranslationsDocument = HydratedDocument<{
  translations: HydratedDocument<Record<string, string>>;
}>;

const pathFilter = (schema: Schema) => (key: string): boolean => {
  if (schema.path(key)) {
    return true;
  } else {
    console.warn(`Translation Plugin found inexistent path: ${key} in schema`);
    console.trace();
    return false;
  }
};

const schemaReducer = (
  entry: TranslationEntryDefinition,
  path: string
): TranslationEntryDefinition => mergeRight(entry, { [path]: String });

type Options = string[];

const attrs = <T extends TranslationsDocument>(
  translatable: T,
  locale: string
) => Object.keys(translatable.translations?.get(locale.toLowerCase()) ?? {});

function translate(
  this: TranslationsDocument,
  locale: string
): { [attr: string]: TranslationEntry } {
  return attrs(this, locale).reduce((attrs, attr) => {
    const translation = this.translations.get(locale)?.[attr];

    return mergeRight(attrs, { [attr]: translation ?? this.get(attr) });
  }, {});
}

export default function translationsPlugin(
  schema: Schema,
  keys?: Options
): Schema {
  if (!keys) return schema;

  const translations = keys
    .filter(pathFilter(schema))
    .reduce(schemaReducer, {});

  return schema
    .add({ translations: new Schema(translations) })
    .method<TranslationsDocument>('translate', translate);
}

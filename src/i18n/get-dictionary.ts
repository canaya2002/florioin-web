import "server-only";
import enMessages from "./messages/en.json";
import esMessages from "./messages/es.json";
import type { Locale } from "./locales";

// Type derived from the EN dictionary; ES must keep the same shape.
export type Dictionary = typeof enMessages;

const dictionaries: Record<Locale, Dictionary> = {
  en: enMessages,
  es: esMessages as Dictionary,
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}

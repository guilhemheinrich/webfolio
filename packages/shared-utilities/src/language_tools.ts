import {Tables} from 'supabase-types'

const DEFAULT_LANG = 'fr'

export function getLanguage(
    location_texts: {webfolio_text_traduction: Tables<"webfolio_text_traduction"> | null}[],
    language_code: string = DEFAULT_LANG,
) {
    if (location_texts.length < 1) return ''
    const default_text =
        location_texts.find(
            (location_text) => location_text.webfolio_text_traduction?.language_code === language_code,
        ) ??
        location_texts.find(
            (location_text) => location_text.webfolio_text_traduction?.language_code === DEFAULT_LANG,
        ) ??
        location_texts[0];
    return default_text.webfolio_text_traduction?.content ?? '';
}
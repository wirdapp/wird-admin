/**
 * Normalizes Arabic and English text for fuzzy search matching.
 *
 * Arabic: unifies alef/yaa/waw/taa-marbuta/kaf variants, strips diacritics and tatweel.
 * English: lowercases.
 */
export function normalizeText(text: string): string {
	return (
		text
			// Alef variants → ا
			.replace(/[أإآٱ]/g, "ا")
			// Yaa variants → ي
			.replace(/[ىئی]/g, "ي")
			// Waw variant → و
			.replace(/ؤ/g, "و")
			// Taa marbuta → ه
			.replace(/ة/g, "ه")
			// Persian kaf → ك
			.replace(/ک/g, "ك")
			// Strip tashkeel/diacritics (U+064B–U+065F) and tatweel (U+0640)
			.replace(/[\u064B-\u065F\u0640]/g, "")
			.toLowerCase()
	);
}

/**
 * Factory that creates a filter function compatible with Base UI Combobox's `filter` prop.
 * Closes over the provided `itemToString` so filtering works regardless of
 * which arguments the Combobox passes to the callback.
 */
export function createNormalizedFilter<T>(itemToString: (item: T) => string) {
	return (itemValue: T, query: string): boolean => {
		if (!query) return true;
		return normalizeText(itemToString(itemValue)).includes(normalizeText(query));
	};
}

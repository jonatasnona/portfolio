import { getRelativeLocaleUrl } from 'astro:i18n';
import { type Locale } from '../site.config';

/** Prefixa com `base` do Astro (GitHub Pages user site: `/`). */
export function withBase(path: string): string {
	const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
	const normalized = path.startsWith('/') ? path : `/${path}`;
	if (!base) return normalized;
	return `${base}${normalized}`;
}

export function localeHomePath(locale: Locale): string {
	// getRelativeLocaleUrl já aplica base + regra do defaultLocale (pt sem prefixo).
	return getRelativeLocaleUrl(locale, '/');
}

export function localePath(locale: Locale, hash = ''): string {
	const home = localeHomePath(locale);
	return hash ? `${home}${hash}` : home;
}

export function previewPath(versionId: string, locale: Locale): string {
	if (locale === 'pt') return withBase(`/v/${versionId}/`);
	return withBase(`/v/${versionId}/${locale}/`);
}

export function assetPath(path: string): string {
	return withBase(path.startsWith('/') ? path : `/${path}`);
}

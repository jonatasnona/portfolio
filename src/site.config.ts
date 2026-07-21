export type Locale = 'pt' | 'en' | 'es';

export const locales: Locale[] = ['pt', 'en', 'es'];

export const siteConfig = {
	/** Layout version served at `/`, `/en/`, `/es/`. Preview routes are DEV-only. */
	activeVersion: 'v6',
	name: 'Jonatas Pedraza',
	siteUrl: 'https://jonatasnona.github.io',
	base: '/portfolio',
	github: 'https://github.com/jonatasnona',
	linkedin: 'https://linkedin.com/in/jonatasnona',
	email: 'jonatas.nona@gmail.com',
	location: {
		pt: 'Carpina, PE, Brasil',
		en: 'Carpina, PE, Brazil',
		es: 'Carpina, PE, Brasil',
	},
	resumePath: '/resume/resume_jonatas_pedraza_pt.pdf',
	brandLogo: '/brand/mandril-logo.png',
} as const;

export type SiteConfig = typeof siteConfig;

export type Locale = 'pt' | 'en' | 'es';

export const locales: Locale[] = ['pt', 'en', 'es'];

export const siteConfig = {
	/** Versão de layout servida em `/`, `/en/`, `/es/`. Preview em `/v/<id>/`. */
	activeVersion: 'v1',
	name: 'Jonatas Pedraza',
	siteUrl: 'https://jonatasnona.github.io',
	base: '/portfolio',
	github: 'https://github.com/jonatasnona',
	linkedin: 'https://linkedin.com/in/jonatasnona',
	email: 'jonatas.nona@gmail.com',
	phone: '+55 21 99971-3374',
	location: {
		pt: 'Carpina, PE, Brasil',
		en: 'Carpina, PE, Brazil',
		es: 'Carpina, PE, Brasil',
	},
	resumePath: '/resume/resume_jonatas_pedraza_pt.pdf',
	brandLogo: '/brand/mandril-logo.png',
} as const;

export type SiteConfig = typeof siteConfig;

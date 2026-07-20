// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://jonatasnona.github.io',
	base: '/portfolio',
	i18n: {
		defaultLocale: 'pt',
		locales: ['pt', 'en', 'es'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	trailingSlash: 'always',
});

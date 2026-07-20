import type { Locale } from '../site.config';
import { en } from './en';
import { es } from './es';
import { pt } from './pt';
import type { PortfolioContent } from './types';

const contentByLocale: Record<Locale, PortfolioContent> = {
	pt,
	en,
	es,
};

export function getContent(locale: Locale): PortfolioContent {
	return contentByLocale[locale];
}

export type { PortfolioContent };

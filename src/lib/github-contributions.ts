const modules = import.meta.glob('../../public/data/github-contributions.json', {
	eager: true,
	import: 'default',
});

export type ContributionLevel =
	| 'NONE'
	| 'FIRST_QUARTILE'
	| 'SECOND_QUARTILE'
	| 'THIRD_QUARTILE'
	| 'FOURTH_QUARTILE';

export type ContributionDay = {
	date: string;
	count: number;
	level: ContributionLevel;
};

export type ContributionWeek = {
	days: ContributionDay[];
};

export type GithubContributions = {
	login: string;
	fetchedAt: string;
	source: string;
	totalContributions: number;
	weeks: ContributionWeek[];
};

/** Approx. weeks in a 6-month window (desktop uses full year). */
export const MOBILE_WEEK_COUNT = 26;

export function weeksForViewport(
	weeks: ContributionWeek[],
	mode: 'full' | 'mobile',
): ContributionWeek[] {
	if (mode === 'full' || weeks.length <= MOBILE_WEEK_COUNT) return weeks;
	return weeks.slice(-MOBILE_WEEK_COUNT);
}

/**
 * Soft-fail when JSON is missing or invalid — section hides; build still succeeds.
 */
export function loadGithubContributions(): GithubContributions | null {
	const raw = Object.values(modules)[0] as unknown;
	if (!isValidContributions(raw)) return null;
	return raw;
}

function isValidContributions(value: unknown): value is GithubContributions {
	if (!value || typeof value !== 'object') return false;
	const v = value as GithubContributions;
	return (
		typeof v.login === 'string' &&
		typeof v.totalContributions === 'number' &&
		Array.isArray(v.weeks)
	);
}

#!/usr/bin/env node
/**
 * Fetches the public GitHub contribution calendar for siteConfig.github
 * and writes public/data/github-contributions.json.
 *
 * Auth: GH_CONTRIBUTIONS_GRAPH_TOKEN (fine-grained profile read / classic read:user).
 * Do not use PUBLIC_* env vars. Do not query per-repo contribution lists
 * (would risk surfacing private repo/org names).
 *
 * Exit 0 on success. Exit 1 on hard failure (Actions can soft-fail via
 * continue-on-error if preferred later).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const LOGIN = 'jonatasnona';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public/data/github-contributions.json');

const QUERY = `
query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}
`;

const LEVELS = new Set([
	'NONE',
	'FIRST_QUARTILE',
	'SECOND_QUARTILE',
	'THIRD_QUARTILE',
	'FOURTH_QUARTILE',
]);

function tokenFromEnv() {
	const token = process.env.GH_CONTRIBUTIONS_GRAPH_TOKEN?.trim();
	if (!token) {
		console.error(
			'Missing GH_CONTRIBUTIONS_GRAPH_TOKEN. Use a fine-grained PAT (profile read) or classic read:user.',
		);
		process.exit(1);
	}
	return token;
}

async function fetchCalendar(token) {
	const res = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			'User-Agent': 'jonatasnona-portfolio-contributions',
		},
		body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
	});

	if (!res.ok) {
		throw new Error(`GraphQL HTTP ${res.status}: ${await res.text()}`);
	}

	const body = await res.json();
	if (body.errors?.length) {
		throw new Error(`GraphQL errors: ${JSON.stringify(body.errors)}`);
	}

	const calendar = body?.data?.user?.contributionsCollection?.contributionCalendar;
	if (!calendar?.weeks) {
		throw new Error('Unexpected GraphQL shape: missing contributionCalendar.weeks');
	}

	return calendar;
}

function normalize(calendar) {
	const weeks = calendar.weeks.map((week) => ({
		days: week.contributionDays.map((day) => {
			const level = LEVELS.has(day.contributionLevel) ? day.contributionLevel : 'NONE';
			return {
				date: day.date,
				count: day.contributionCount,
				level,
			};
		}),
	}));

	return {
		login: LOGIN,
		fetchedAt: new Date().toISOString(),
		source: 'github-graphql',
		totalContributions: calendar.totalContributions,
		weeks,
	};
}

const token = tokenFromEnv();
const calendar = await fetchCalendar(token);
const payload = normalize(calendar);

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, `${JSON.stringify(payload, null, '\t')}\n`, 'utf8');
console.log(
	`Wrote ${OUT} (${payload.totalContributions} contributions, ${payload.weeks.length} weeks)`,
);

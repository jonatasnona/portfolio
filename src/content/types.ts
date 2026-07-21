export type SkillGroup = {
	title: string;
	items: string[];
};

export type Experience = {
	company: string;
	role: string;
	period: string;
	location: string;
	bullets: string[];
	technologies: string[];
};

export type PortfolioContent = {
	meta: {
		title: string;
		description: string;
	};
	nav: {
		about: string;
		experience: string;
		skills: string;
		contact: string;
		resume: string;
		versionPreview: string;
	};
	hero: {
		eyebrow: string;
		headline: string;
		tagline: string;
		ctaContact: string;
		ctaResume: string;
	};
	about: {
		title: string;
		body: string;
	};
	experience: {
		title: string;
		items: Experience[];
	};
	skills: {
		title: string;
		groups: SkillGroup[];
	};
	contributions: {
		title: string;
		summary: string;
		profileLink: string;
		legendLabel: string;
		legendLess: string;
		legendMore: string;
		contributionSingular: string;
		contributionPlural: string;
	};
	contact: {
		title: string;
		body: string;
		ctaEmail: string;
		labels: {
			email: string;
			linkedin: string;
			github: string;
			location: string;
		};
	};
	footer: {
		rights: string;
		brandNote: string;
	};
};

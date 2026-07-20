import type { Locale } from '../site.config';
import type { PortfolioContent } from '../content/types';

export type VersionId =
	| 'v1'
	| 'v2'
	| 'v3'
	| 'v4'
	| 'v5'
	| 'v6'
	| 'v7'
	| 'v8'
	| 'v9'
	| 'v10'
	| 'v11'
	| 'v12'
	| 'v13'
	| 'v14'
	| 'v15';

export const versionIds: VersionId[] = [
	'v1',
	'v2',
	'v3',
	'v4',
	'v5',
	'v6',
	'v7',
	'v8',
	'v9',
	'v10',
	'v11',
	'v12',
	'v13',
	'v14',
	'v15',
];

export const versionMeta: Record<
	VersionId,
	{ label: string; title: string; blurb: string }
> = {
	v1: { label: 'v1', title: 'Classic', blurb: 'Header sticky + hero split + timeline' },
	v2: { label: 'v2', title: 'Split', blurb: 'Painel de marca + coluna de conteúdo' },
	v3: { label: 'v3', title: 'Ledger', blurb: 'Currículo/documento técnico' },
	v4: { label: 'v4', title: 'Cover', blurb: 'Hero full-viewport + scroll depois' },
	v5: { label: 'v5', title: 'Stack', blurb: 'Experiência em cards empilhados' },
	v6: { label: 'v6', title: 'Wire', blurb: 'Blueprint / grid técnico' },
	v7: { label: 'v7', title: 'Poster', blurb: 'Seções como painéis verticais' },
	v8: { label: 'v8', title: 'Accordion', blurb: 'Experiência em linhas expansíveis' },
	v9: { label: 'v9', title: 'Masthead', blurb: 'Jornal: cabeçalho + colunas' },
	v10: { label: 'v10', title: 'Twin', blurb: 'Seções 50/50 tela cheia' },
	v11: { label: 'v11', title: 'Mosaic', blurb: 'Blocos masonry de altura variável' },
	v12: { label: 'v12', title: 'Pulse', blurb: 'Faixa de anos + detalhe abaixo' },
	v13: { label: 'v13', title: 'Folio', blurb: 'Spreads de revista ímpares/pares' },
	v14: { label: 'v14', title: 'Ingress', blurb: 'Carta/longo lead + seções' },
	v15: { label: 'v15', title: 'Lattice', blurb: 'Multi-coluna densa broadsheet' },
};

export type VersionLayoutProps = {
	locale: Locale;
	content: PortfolioContent;
	versionId: VersionId;
	isPreview?: boolean;
};

const layoutModules = import.meta.glob('./*/Layout.astro');

export function isVersionId(value: string): value is VersionId {
	return (versionIds as string[]).includes(value);
}

export async function loadVersionLayout(versionId: VersionId) {
	const key = `./${versionId}/Layout.astro`;
	const loader = layoutModules[key];
	if (!loader) {
		throw new Error(`Versão de layout não encontrada: ${versionId}`);
	}
	const mod = (await loader()) as { default: (props: VersionLayoutProps) => unknown };
	return mod.default;
}

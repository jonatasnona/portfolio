#!/usr/bin/env node
/**
 * Build-time resume PDFs from /resume/{locale}/ pages.
 * Writes into public/resume/ and mirrors into dist/resume/ when dist exists.
 *
 * Usage (after `astro build`):
 *   node scripts/generate-resumes.mjs
 */
import { createServer } from 'node:http';
import { mkdir, copyFile, access } from 'node:fs/promises';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PUBLIC_RESUME = join(ROOT, 'public/resume');
const DIST_RESUME = join(DIST, 'resume');
const BASE = '/portfolio';
const LOCALES = ['pt', 'en', 'es'];

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.ico': 'image/x-icon',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.json': 'application/json',
	'.pdf': 'application/pdf',
};

function resolveFile(urlPath) {
	let pathname = decodeURIComponent(urlPath.split('?')[0]);
	if (pathname.startsWith(BASE)) pathname = pathname.slice(BASE.length) || '/';
	if (!pathname.startsWith('/')) pathname = `/${pathname}`;

	const candidates = [];
	if (pathname.endsWith('/')) {
		candidates.push(join(DIST, pathname, 'index.html'));
	} else {
		candidates.push(join(DIST, pathname));
		candidates.push(join(DIST, `${pathname}.html`));
		candidates.push(join(DIST, pathname, 'index.html'));
	}

	for (const file of candidates) {
		if (existsSync(file) && statSync(file).isFile()) return file;
	}
	return null;
}

function startStaticServer() {
	return new Promise((resolve, reject) => {
		const server = createServer((req, res) => {
			const file = resolveFile(req.url || '/');
			if (!file) {
				res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
				res.end('Not found');
				return;
			}
			const type = MIME[extname(file).toLowerCase()] || 'application/octet-stream';
			res.writeHead(200, { 'Content-Type': type });
			createReadStream(file).pipe(res);
		});

		server.once('error', reject);
		server.listen(0, '127.0.0.1', () => {
			const { port } = server.address();
			resolve({ server, port });
		});
	});
}

async function assertDist() {
	try {
		await access(join(DIST, 'resume', 'pt', 'index.html'));
	} catch {
		throw new Error('Missing dist/resume/pt/index.html — run `astro build` first.');
	}
}

async function main() {
	await assertDist();
	await mkdir(PUBLIC_RESUME, { recursive: true });
	await mkdir(DIST_RESUME, { recursive: true });

	const { server, port } = await startStaticServer();
	const origin = `http://127.0.0.1:${port}${BASE}`;
	const browser = await chromium.launch({ headless: true });

	try {
		for (const locale of LOCALES) {
			const page = await browser.newPage();
			const url = `${origin}/resume/${locale}/`;
			console.log(`Printing ${url}`);
			await page.goto(url, { waitUntil: 'networkidle' });
			await page.emulateMedia({ media: 'print' });

			const filename = `resume_jonatas_pedraza_${locale}.pdf`;
			const publicPath = join(PUBLIC_RESUME, filename);
			await page.pdf({
				path: publicPath,
				format: 'A4',
				printBackground: true,
				margin: { top: '12mm', right: '14mm', bottom: '12mm', left: '14mm' },
			});
			await copyFile(publicPath, join(DIST_RESUME, filename));
			await page.close();
			console.log(`Wrote ${filename}`);
		}
	} finally {
		await browser.close();
		server.close();
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

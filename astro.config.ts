import { defineConfig, fontProviders } from 'astro/config';
import { DEFAULT_LANG, LANGUAGES } from './src/utils/i18n.ts';

export default defineConfig({
	site: 'https://nicoladicicco.github.io',
	redirects: { '/': `/${DEFAULT_LANG}/` },
	i18n: {
		locales: LANGUAGES,
		defaultLocale: DEFAULT_LANG,
		routing: { prefixDefaultLocale: true },
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Literata',
			cssVariable: '--font-literata',
			weights: [400, 700],
			styles: ['normal', 'italic'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['Georgia', 'serif'],
		},
	],
	markdown: {
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark' },
			defaultColor: false,
		},
	},
	build: { inlineStylesheets: 'always' },
});

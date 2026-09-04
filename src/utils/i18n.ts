export const SITE_NAME = 'Nicola Di Cicco';

const en = {
	name: 'English',
	tag: 'en-US',
	home: 'Home',
	blog: 'Blog',
	siteDescription: `Personal website of ${SITE_NAME}.`,
	blogDescription: `Posts by ${SITE_NAME}.`,
	empty: 'No posts yet.',
	allPosts: '← All posts',
	notAvailable: 'not available',
	skipToContent: 'Skip to content',
	toggleDarkMode: 'Dark mode',
};

const it: typeof en = {
	name: 'Italiano',
	tag: 'it-IT',
	home: 'Home',
	blog: 'Blog',
	siteDescription: `Sito personale di ${SITE_NAME}.`,
	blogDescription: `Articoli di ${SITE_NAME}.`,
	empty: 'Ancora nessun articolo.',
	allPosts: '← Tutti gli articoli',
	notAvailable: 'non disponibile',
	skipToContent: 'Vai al contenuto',
	toggleDarkMode: 'Tema scuro',
};

export const LOCALES = { en, it };

export type Lang = keyof typeof LOCALES;

export const LANGUAGES = Object.keys(LOCALES) as Lang[];

export const DEFAULT_LANG: Lang = 'en';

export const isLang = (value?: string): value is Lang => !!value && value in LOCALES;

export const toLang = (value?: string): Lang => {
	if (!isLang(value)) throw new Error(`Unsupported locale "${value}"`);
	return value;
};

export const localeStaticPaths = () => LANGUAGES.map((lang) => ({ params: { lang } }));

export const formatDate = (date: string, lang: Lang) =>
	Temporal.PlainDate.from(date).toLocaleString(LOCALES[lang].tag, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

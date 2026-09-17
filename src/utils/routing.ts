import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Lang } from './i18n';

export const localeSubpath = (url: URL, lang: Lang) =>
	url.pathname.slice(getRelativeLocaleUrl(lang).length).replace(/^\/+|\/+$/g, '');

export const localeHref = (url: URL, from: Lang, to: Lang) =>
	getRelativeLocaleUrl(to, localeSubpath(url, from));

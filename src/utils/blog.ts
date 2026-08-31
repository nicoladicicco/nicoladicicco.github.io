import { getCollection, type CollectionEntry } from 'astro:content';
import { isLang, type Lang } from './i18n';

export type Post = CollectionEntry<'blog'>;

type BlogEntry = { post: Post; lang: Lang; slug: string };

let cached: Promise<BlogEntry[]> | undefined;

export const getPosts = () => (cached ??= load());

async function load(): Promise<BlogEntry[]> {
	const posts = await getCollection('blog', ({ data }) => !data.draft);

	return posts
		.toSorted((a, b) => Temporal.PlainDate.compare(b.data.pubDate, a.data.pubDate))
		.map((post) => {
			const [lang, ...rest] = post.id.split('/');
			if (!isLang(lang)) throw new Error(`Unknown language "${lang}" in "${post.id}"`);
			return { post, lang, slug: rest.join('/') };
		});
}

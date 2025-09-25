import { Metadata } from 'next';
import {Grid, Container, Typography, Stack} from '@mui/material';
import { BlogCard, BlogCardSkeleton } from '@/components/blog/BlogCard';
import { getBlogPosts } from '@/lib/api/blog';

export const metadata: Metadata = {
    title: 'لیست مقالات',
    description: 'آخرین مقالات منتشر شده در بلاگ',
};

function parseSearchParams(searchParams: Record<string, string | string[] | undefined>) {
    const page = Number(Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page) || 1;
    const pageSize = Math.min(
        24,
        Math.max(6, Number(Array.isArray(searchParams.page_size) ? searchParams.page_size[0] : searchParams.page_size) || 12)
    );
    const tag = Array.isArray(searchParams.tag) ? searchParams.tag[0] : searchParams.tag;
    return { page, pageSize, tag };
} // ================================================== parseSearchParams

export default async function BlogListPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
    const xs = 12
    const sm = 6
    const md = 3
    const spacing = 3
    const { page, pageSize, tag } = parseSearchParams(searchParams);

    let data;
    try {
        data = await getBlogPosts({ page, pageSize, tag });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        data = { count: 0, next: null, previous: null, results: [] };
    }

    const posts = data.results;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={500}>
                مقالات بلاگ
            </Typography>

            {posts.length === 0 ? (
                <Grid container spacing={spacing}>
                     {Array.from({ length: 6 }).map((_, i) => (
                         <Grid key={i} item xs={xs} sm={sm} md={md}>
                            <BlogCardSkeleton variant="grid" />
                         </Grid>
                     ))}
                </Grid>
            ) : (
                // <Stack spacing={2}>
                //      {posts.map((p) => (
                //          <BlogCard key={p.slug} {...p} variant="list" />
                //      ))}
                // </Stack>
                <Grid container spacing={spacing}>
                    {posts.map((post) => (
                        <Grid key={post.slug} item xs={xs} sm={sm} md={md}>
                            <BlogCard
                                slug={post.slug}
                                title={post.title}
                                excerpt={post.excerpt}
                                coverImageUrl={post.thumbnail ?? undefined}
                                coverAlt={post.title}
                                authorName={post.author?.full_name}
                                authorAvatarUrl={post.author?.avatar ?? undefined}
                                publishedAt={post.published_at}
                                tags={post.tags}
                                readingTime={post.reading_time}
                                views={post.view_count}
                                variant="grid"
                                rounded={0.5}
                                href={post.href}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
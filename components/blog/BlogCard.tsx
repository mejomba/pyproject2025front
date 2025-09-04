// components/blog/BlogCard.tsx
// Reusable MUI card for blog post lists (grid & list variants), RTL-friendly, Next.js-ready

"use client";

import * as React from "react";
// import Link from "next/link";
import Image from "next/image";
import DEFAULT_PLACEHOLDER from "@/images/placeholders/blog-cover.png"

import {
    Card,
    CardActionArea,
    CardContent,
    CardActions,
    Typography,
    Chip,
    Box,
    Stack,
    Avatar,
    Button,
    Skeleton,
    Link as MuiLink
} from "@mui/material";
// import theme from "tailwindcss/defaultTheme";

export type BlogCardVariant = "grid" | "list";

export interface BlogCardProps {
    /** Prefer slug over id for clean URLs */
    slug: string;
    /** If provided, overrides /blog/[slug] */
    href?: string;
    title: string;
    /** Pre-truncated/clean excerpt from API (plain text preferred) */
    excerpt?: string;
    coverImageUrl?: string | null;
    coverAlt?: string;
    authorName?: string;
    authorAvatarUrl?: string | null;
    /** Provide a preformatted date string (locale handled by API or parent) */
    publishedAt?: string;
    tags?: string[];
    /** e.g., "6 دقیقه مطالعه" */
    readingTime?: string;
    /** e.g., 1234 */
    views?: number;
    variant?: BlogCardVariant;
    /** Card radius & elevation are themable; exposed here for flexibility */
    elevation?: number;
    rounded?: number; // borderRadius theme units, e.g., 3 => theme.shape.borderRadius * 3
    /** Disable link behavior */
    clickable?: boolean;
    /** Max lines for title in grid mode */
    maxTitleLines?: 2 | 3;
    /** Max lines for excerpt in grid mode */
    maxExcerptLines?: 3 | 4 | 5;
    /** Optional className for outer Card */
    className?: string;
}

// const DEFAULT_PLACEHOLDER = "/images/placeholders/blog-cover.png";

function clampLines(lines: number) {
    return {
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical" as const,
        overflow: "hidden",
    };
}

export const BlogCard: React.FC<BlogCardProps> = React.memo(
    ({
         slug,
         href,
         title,
         excerpt,
         coverImageUrl,
         coverAlt,
         authorName,
         authorAvatarUrl,
         publishedAt,
         tags = [],
         readingTime,
         views,
         variant = "grid",
         elevation = 1,
         rounded = 3,
         clickable = false,
         maxTitleLines = 2,
         maxExcerptLines = 3,
         className,
     }) => {
        const to = href ?? `/blog/${encodeURIComponent(slug)}`;
        const media = (
            <Box
                sx={{
                    position: "relative",
                    width: 1,
                    ...(variant === "grid"
                        ? { aspectRatio: "16 / 9" }
                        : { height: 168, width: { xs: 1, sm: 260 } }),
                    overflow: "hidden",
                    borderTopLeftRadius: variant === "grid" ? (theme) => theme.shape.borderRadius * rounded : 0,
                    borderTopRightRadius: variant === "grid" ? (theme) => theme.shape.borderRadius * rounded : 0,
                    borderRadius: variant === "list" ? (theme) => theme.shape.borderRadius * rounded : undefined,
                    flexShrink: 0,
                    bgcolor: "action.hover",
                }}
            >
                <Image
                    src={coverImageUrl || DEFAULT_PLACEHOLDER}
                    alt={coverAlt || title}
                    fill
                    sizes={variant === "grid" ? "(max-width: 600px) 100vw, 33vw" : "(max-width: 900px) 100vw, 260px"}
                    style={{ objectFit: "cover" }}
                    priority={false}
                />
            </Box>
        );

        const Content = (
            <CardContent sx={{ p: 2, flex: 1 }}>
                <Stack spacing={1}>
                    <MuiLink href={href} sx={{ textDecoration: "none", color: "secondary.main" }}>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{ fontWeight: 500, ...clampLines(maxTitleLines) }}
                        >
                            {title}
                        </Typography>
                    </MuiLink>

                    {excerpt ? (
                        <Typography variant="body2" color="text.secondary" sx={clampLines(maxExcerptLines)}>
                            {excerpt}
                        </Typography>
                    ) : null}

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                        {authorAvatarUrl ? <Avatar src={authorAvatarUrl || undefined} alt={authorName} sx={{ width: 24, height: 24 }} /> : null}
                        {authorName ? (
                            <Typography variant="caption" color="text.secondary">
                                {authorName}
                            </Typography>
                        ) : null}
                        {(authorName && (publishedAt || readingTime)) ? (
                            <Typography variant="caption" color="text.disabled">•</Typography>
                        ) : null}
                        {publishedAt ? (
                            <Typography variant="caption" color="text.secondary">
                                {publishedAt}
                            </Typography>
                        ) : null}
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                        {readingTime ? (
                            <>
                                <Typography variant="caption" color="text.disabled">•</Typography>
                                <Typography variant="caption" color="text.secondary">{readingTime}</Typography>
                            </>
                        ) : null}
                        {typeof views === "number" ? (
                            <>
                                <Typography variant="caption" color="text.disabled">•</Typography>
                                <Typography variant="caption" color="text.secondary">{views.toLocaleString()} بازدید</Typography>
                            </>
                        ) : null}
                    </Stack>

                    {tags?.length ? (
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 0.5 }}>
                            {tags.slice(0, 6).map((tag) => (
                                <Chip key={tag} label={tag} size="small" variant="outlined" component={MuiLink} href={"#"}
                                      sx={{
                                          cursor: "pointer",
                                          transition: "background-color 0.3s ease",
                                          "&:hover":
                                              { bgcolor: 'action.hover' },
                                      }}  />
                            ))}
                        </Box>
                    ) : null}
                </Stack>
            </CardContent>
        );

        const inner = (
            <Stack
                direction={variant === "list" ? { xs: "column", sm: "row" } : "column"}
                spacing={variant === "list" ? 2 : 0}
                sx={{ height: 1 }}
            >
                {variant === "list" ? (
                    <>
                        {media}
                        <Stack sx={{ flex: 1, minWidth: 0 }}>{Content}</Stack>
                    </>
                ) : (
                    <>
                        {media}
                        {Content}
                    </>
                )}
            </Stack>
        );

        const card = (
            <Card elevation={elevation} className={className} sx={{ borderRadius: (theme) => theme.shape.borderRadius * rounded, height: 1, display: "flex", flexDirection: "column" }}>
                {clickable ? (
                    <CardActionArea component={MuiLink} href={to} aria-label={`مشاهده ${title}`} sx={{ height: 1 }}>
                        {inner}
                    </CardActionArea>
                ) : (
                    inner
                )}
                {/* Optional actions (hide by default to keep card clean) */}
                {/* <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
          <Button component={Link} href={to} size="small">ادامه مطلب</Button>
        </CardActions> */}
            </Card>
        );

        return card;
    }
);

BlogCard.displayName = "BlogCard";

// Skeleton for loading states
export function BlogCardSkeleton({ variant = "grid" as BlogCardVariant }: { variant?: BlogCardVariant }) {
    return (
        <Card elevation={0} sx={{ borderRadius: 3 }}>
            {variant === "grid" ? (
                <>
                    <Box sx={{ aspectRatio: "16/9", width: 1 }}>
                        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ transform: "none" }} />
                    </Box>
                    <CardContent>
                        <Skeleton width="70%" height={28} sx={{ mb: 1 }} />
                        <Skeleton width="100%" height={18} />
                        <Skeleton width="90%" height={18} />
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Skeleton variant="rounded" width={56} height={24} />
                            <Skeleton variant="rounded" width={56} height={24} />
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                            <Skeleton variant="circular" width={24} height={24} />
                            <Skeleton width={80} height={16} />
                            <Skeleton width={60} height={16} />
                        </Stack>
                    </CardContent>
                </>
            ) : (
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Box sx={{ width: { xs: 1, sm: 260 }, height: 168 }}>
                        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ transform: "none" }} />
                    </Box>
                    <CardContent sx={{ flex: 1 }}>
                        <Skeleton width="70%" height={28} sx={{ mb: 1 }} />
                        <Skeleton width="100%" height={18} />
                        <Skeleton width="90%" height={18} />
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Skeleton variant="rounded" width={56} height={24} />
                            <Skeleton variant="rounded" width={56} height={24} />
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                            <Skeleton variant="circular" width={24} height={24} />
                            <Skeleton width={80} height={16} />
                            <Skeleton width={60} height={16} />
                        </Stack>
                    </CardContent>
                </Stack>
            )}
        </Card>
    );
}

/*
USAGE EXAMPLES

// Grid view (e.g., in a responsive Masonry or Grid container)
<Grid container spacing={2}>
  {posts.map((p) => (
    <Grid key={p.slug} item xs={12} sm={6} md={4}>
      <BlogCard
        slug={p.slug}
        title={p.title}
        excerpt={p.excerpt}
        coverImageUrl={p.cover_image}
        authorName={p.author?.full_name}
        authorAvatarUrl={p.author?.avatar}
        publishedAt={p.published_display}
        tags={p.tags}
        readingTime={p.reading_time}
        views={p.views}
        variant="grid"
      />
    </Grid>
  ))}
</Grid>

// List view (e.g., category pages)
<Stack spacing={2}>
  {posts.map((p) => (
    <BlogCard key={p.slug} {...p} variant="list" />
  ))}
</Stack>

// Skeleton usage while loading
<Grid container spacing={2}>
  {Array.from({ length: 6 }).map((_, i) => (
    <Grid item xs={12} sm={6} md={4} key={i}>
      <BlogCardSkeleton variant="grid" />
    </Grid>
  ))}
</Grid>
*/

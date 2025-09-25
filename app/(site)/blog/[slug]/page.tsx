import React from "react";
import { notFound } from "next/navigation";
import {Grid, Typography, Paper, CardMedia} from "@mui/material";
import BlogDetailMeta from "@/components/blog/BlogDetailMeta"
import DEFAULT_PLACEHOLDER from "@/images/placeholders/blog-cover.png"
import {getPostBySlug} from "@/lib/api/blog";
import SafeTypography from "@/components/comm/safeTypographi";

type Props = {
    params: { slug: string };
};

export default async function BlogDetail({ params }: Props) {
    const post = await getPostBySlug(params.slug);
    if (!post) {
        notFound();
    }
    return (
        <Grid container spacing={2} sx={{ p: 2 }}>

            {/* ستون سمت راست - سایدبار (30%) */}
            <Grid item xs={12} md={3} order={{ xs: 2, md: 1}}>
                <Paper sx={{ p: 2, position: "sticky", top: 20 }}>
                    <Typography variant="h6" gutterBottom>
                        مقالات مرتبط
                    </Typography>
                    <ul>
                        <li>مقاله ۱</li>
                        <li>مقاله ۲</li>
                        <li>مقاله ۳</li>
                    </ul>
                </Paper>
            </Grid>

            {/* ستون سمت چپ - محتوای اصلی (70%) */}
            <Grid item xs={12} md={9} order={{ xs: 1, md: 2}}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        {post.title}
                    </Typography>

                    {/* Meta */}
                    <BlogDetailMeta {...post} />

                    {/* image */}
                    <CardMedia
                        component="img"
                        // image={DEFAULT_PLACEHOLDER.src}
                        image={post.thumbnail}
                        alt="Article header"
                        sx={{ borderRadius: 2, my: 2 }}
                    />
                    <SafeTypography html={post.content} allowRichContent={true} />
                    {/* <Typography variant="body1" paragraph textAlign="justify" className="font-300"> */}
                        {/* {post.content} */}
                    {/* </Typography> */}
                </Paper>
            </Grid>

        </Grid>
    );
}

"use client"
import React, { useState } from "react";
import {
    Stack,
    Typography,
    Link,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    AppBar,
    Toolbar,
    Box, CardMedia
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import {ApiPost} from "@/lib/api/blog";
import SafeTypography from "@/components/comm/safeTypographi";


export default function BlogDetailMeta(post: ApiPost) {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ mb: 3 }}>
            <Stack
                direction="row"
                alignItems="center"
                spacing={3}
                sx={{ color: "text.secondary", fontSize: 14, flexWrap: "wrap", rowGap: 1,}}
            >
                {/* دانلود PDF */}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <PictureAsPdfIcon fontSize="small" />
                    <Link href="/sample.pdf" underline="hover">
                        PDF
                    </Link>
                </Stack>

                {/* مدت زمان مطالعه */}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="body2">۶ دقیقه</Typography>
                </Stack>

                {/* تاریخ */}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <CalendarTodayIcon fontSize="small" />
                    <Typography variant="body2">۱۴۰۴/۰۶/۱۵</Typography>
                </Stack>

                {/* تعداد بازدید */}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <VisibilityIcon fontSize="small" />
                    <Typography variant="body2">۱۵۰</Typography>
                </Stack>

                {/* دکمه Reader Mode */}
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => setOpen(true)}
                    sx={{ backgroundColor:"primary.main" }}
                >
                    حالت مطالعه
                </Button>
            </Stack>

            {/* Reader Mode */}
            <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
                <AppBar sx={{ position: "relative"}}>
                    <Toolbar>
                        <Typography sx={{ flex: 1 }} variant="h6">
                            {post.title}
                        </Typography>
                        <IconButton edge="end" color="inherit" onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <DialogContent sx={{ p: 4, display: "flex", justifyContent: "center" }}>
                    <Box sx={{ maxWidth: "1000px", width: "100%" }}>
                        {/* image */}
                        <CardMedia
                            component="img"
                            image={post.thumbnail}
                            alt="Article header"
                            sx={{ borderRadius: 2, my: 2 }}
                        />
                        <SafeTypography html={post.content} allowRichContent={true} />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

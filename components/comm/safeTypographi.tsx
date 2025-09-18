// components/common/SafeTypography.tsx
"use client"

import { useEffect, useState } from "react"
import DOMPurify from "dompurify"
import { Typography } from "@mui/material"

type SafeTypographyProps = {
    html: string
    maxLines?: number
    variant?: "body1" | "body2" | "subtitle1" | "subtitle2"
    color?: string
}

export default function SafeTypography({
                                           html,
                                           maxLines = 3,
                                           variant = "body2",
                                           color = "text.secondary",
                                       }: SafeTypographyProps) {
    const [cleanHTML, setCleanHTML] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCleanHTML(DOMPurify.sanitize(html))
        }
    }, [html])

    return (
        <Typography
            variant={variant}
            color={color}
            sx={{
                display: "-webkit-box",
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            }}
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
    )
}

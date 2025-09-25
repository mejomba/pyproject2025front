// components/common/SafeTypography.tsx
"use client"

import { useEffect, useState } from "react"
import DOMPurify from "dompurify"
import { Typography, Box } from "@mui/material"

type SafeTypographyProps = {
    html: string
    maxLines?: number
    variant?: "body1" | "body2" | "subtitle1" | "subtitle2"
    color?: string
    /** If true, allows full HTML content including images, links, etc. */
    allowRichContent?: boolean
}

export default function SafeTypography({
                                           html,
                                           maxLines = 3,
                                           variant = "body2",
                                           color = "text.secondary",
                                           allowRichContent = false,
                                       }: SafeTypographyProps) {
    const [cleanHTML, setCleanHTML] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            const backendBaseUrl = (process.env.NEXT_PUBLIC_BASE_URL as string) || "http://localhost:8000"
            // Configure DOMPurify based on whether we want rich content
            const config = allowRichContent ? {
                ALLOWED_TAGS: [
                    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div',
                    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                    'ul', 'ol', 'li', 'blockquote',
                    'a', 'img', 'figure', 'figcaption',
                    'table', 'thead', 'tbody', 'tr', 'th', 'td',
                    'code', 'pre'
                ],
                ALLOWED_ATTR: [
                    'href', 'target', 'rel', 'title', 'alt', 'src', 'width', 'height',
                    'class', 'id', 'style', 'data-*'
                ],
                ALLOW_DATA_ATTR: true,
                ALLOW_UNKNOWN_PROTOCOLS: false,
                SANITIZE_DOM: true,
                KEEP_CONTENT: true,
                // Allow images from any source (you might want to restrict this)
                ADD_ATTR: ['target'],
                // Ensure images are responsive
                ADD_TAGS: ['figure', 'figcaption'],
            } : {
                ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span'],
                ALLOWED_ATTR: [],
            }
            const sanitized = DOMPurify.sanitize(html, config)

            if (allowRichContent) {
                const parser = new DOMParser()
                const doc = parser.parseFromString(sanitized, 'text/html')

                // Rewrite <img src> and <a href> that are relative to the backend base URL
                const rewriteAttr = (el: Element, attr: 'src' | 'href') => {
                    const value = el.getAttribute(attr)
                    if (!value) return
                    // Skip data URLs and anchors
                    if (value.startsWith('data:') || value.startsWith('#')) return
                    try {
                        const absolute = new URL(value, backendBaseUrl).toString()
                        el.setAttribute(attr, absolute)
                    } catch (_) {
                        // Ignore malformed URLs
                    }
                }

                doc.querySelectorAll('img[src]').forEach((img) => rewriteAttr(img, 'src'))
                doc.querySelectorAll('a[href]').forEach((a) => rewriteAttr(a, 'href'))

                setCleanHTML(doc.body.innerHTML)
            } else {
                setCleanHTML(sanitized)
            }
        }
    }, [html, allowRichContent])

    // If we're allowing rich content, use a Box instead of Typography
    // to avoid MUI's text-specific styling conflicts
    if (allowRichContent) {
        return (
            <Box
                sx={{
                    '& img': {
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: 1,
                        my: 2,
                        display: 'block',
                        mx: 'auto',
                    },
                    '& figure': {
                        margin: 0,
                        textAlign: 'center',
                        my: 2,
                    },
                    '& figcaption': {
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        mt: 1,
                        fontStyle: 'italic',
                    },
                    '& p': {
                        marginBottom: '1rem',
                        lineHeight: 1.7,
                        textAlign: 'justify',
                    },
                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                        marginTop: '1.5rem',
                        marginBottom: '1rem',
                        fontWeight: 600,
                    },
                    '& ul, & ol': {
                        paddingLeft: '1.5rem',
                        marginBottom: '1rem',
                    },
                    '& li': {
                        marginBottom: '0.5rem',
                    },
                    '& blockquote': {
                        borderLeft: '4px solid',
                        borderColor: 'primary.main',
                        paddingLeft: '1rem',
                        margin: '1rem 0',
                        fontStyle: 'italic',
                        backgroundColor: 'action.hover',
                        padding: '1rem',
                        borderRadius: 1,
                    },
                    '& a': {
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    },
                    '& code': {
                        backgroundColor: 'action.hover',
                        padding: '0.2rem 0.4rem',
                        borderRadius: 0.5,
                        fontSize: '0.875em',
                        fontFamily: 'monospace',
                    },
                    '& pre': {
                        backgroundColor: 'action.hover',
                        padding: '1rem',
                        borderRadius: 1,
                        overflow: 'auto',
                        margin: '1rem 0',
                        '& code': {
                            backgroundColor: 'transparent',
                            padding: 0,
                        },
                    },
                    '& table': {
                        width: '100%',
                        borderCollapse: 'collapse',
                        margin: '1rem 0',
                    },
                    '& th, & td': {
                        border: '1px solid',
                        borderColor: 'divider',
                        padding: '0.5rem',
                        textAlign: 'left',
                    },
                    '& th': {
                        backgroundColor: 'action.hover',
                        fontWeight: 600,
                    },
                }}
                dangerouslySetInnerHTML={{ __html: cleanHTML }}
            />
        )
    }

    // For simple text content, use Typography with line clamping
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

// lib/api/blog.ts
import api from '@/lib/axios';
import { cookies } from 'next/headers';

export interface Author {
    full_name?: string;
    avatar?: string | null;
}
export interface ApiPost {
    slug: string;
    title: string;
    excerpt?: string;
    cover_image?: string | null;
    published_at?: string;
    reading_time?: string;
    views?: number;
    tags?: string[];
    author?: Author;
}
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export async function getBlogPosts({ page, pageSize, tag }: { page: number; pageSize: number; tag?: string | null }): Promise<PaginatedResponse<ApiPost>> {
    const params: Record<string, any> = { page, page_size: pageSize };
    if (tag) params.tag = tag;

    const cookieHeader = cookies().toString();

    try {
        const { data } = await api.get('/blog/posts/', {
            params,
            // headers: {
            //     ...(cookieHeader ? { Cookie: cookieHeader } : {}),
            //     Accept: 'application/json',
            // },
        });
        return data as PaginatedResponse<ApiPost>;
    } catch (err: any) {
        const status = err?.response?.status;
        throw new Error(`Failed to load posts: ${status ?? 'unknown'}`);
    }
}

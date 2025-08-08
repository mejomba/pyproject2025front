
export function saveTokens(access: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('access', access)
    }
}

export function getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('access')
}

export function clearAccessToken() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('access')
    }
}

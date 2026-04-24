export function formatSeconds(s: number | null | undefined): string {
    if (s == null || isNaN(s)) return '—'
    const secs = Math.round(s)
    if (secs < 60) return `${secs}s`
    if (secs < 3600) {
        const m = Math.floor(secs / 60)
        const rem = secs % 60
        return `${m}m ${rem}s`
    }
    if (secs < 86400) {
        const h = Math.floor(secs / 3600)
        const m = Math.floor((secs % 3600) / 60)
        return `${h}h ${m}m`
    }
    const d = Math.floor(secs/86400)
    const h = Math.floor((secs%86400) / 3600)
    const m = Math.floor(((secs%86400) % 3600) / 60)
    return `${d}d ${h}h ${m}m`
}
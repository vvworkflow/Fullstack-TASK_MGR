import { ReactNode } from 'react'

interface Props {
    title: string
    children: ReactNode
}

export default function Section({ title, children }: Props) {
    return (
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-4 border-b-2 border-gb-border pb-3">
                <h2 className="text-gb-orange font-bold text-sm uppercase tracking-widest">{title}</h2>
            </div>
            {children}
        </div>
    )
}
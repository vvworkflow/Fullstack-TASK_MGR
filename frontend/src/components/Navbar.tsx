import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav
            className="bg-gb-card border-b-2 border-gb-border sticky top-0 z-40"
            style={{ borderBottomColor: '#f97316' }}
        >
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                {/* Logo */}
                <span className="text-gb-orange font-mono font-bold text-lg tracking-widest select-none">
          [ TASK_MGR ]
        </span>

                {/* Nav Links */}
                <div className="flex items-center gap-6">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `font-mono uppercase text-sm tracking-wider transition-colors duration-100 pb-1 ${
                                isActive
                                    ? 'text-gb-orange border-b-2 border-gb-orange'
                                    : 'text-gb-muted hover:text-gb-text border-b-2 border-transparent'
                            }`
                        }
                    >
                        TASKS
                    </NavLink>
                    <NavLink
                        to="/statistics"
                        className={({ isActive }) =>
                            `font-mono uppercase text-sm tracking-wider transition-colors duration-100 pb-1 ${
                                isActive
                                    ? 'text-gb-orange border-b-2 border-gb-orange'
                                    : 'text-gb-muted hover:text-gb-text border-b-2 border-transparent'
                            }`
                        }
                    >
                        STATS
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
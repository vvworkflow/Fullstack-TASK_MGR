import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TasksPage from './pages/TasksPage'
import StatisticsPage from './pages/StatisticsPage'

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gb-bg font-mono">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 py-6">
                    <Routes>
                        <Route path="/" element={<TasksPage />} />
                        <Route path="/statistics" element={<StatisticsPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}
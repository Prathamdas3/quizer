import ThemeToggle from '@/components/themeToggler.button'
import { useNavigate } from 'react-router'

export default function Navbar() {
    const router=useNavigate()
    return <header className="flex items-center h-20 bg-white shadow-md dark:bg-gray-800 ">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
            <h1 className="text-2xl font-bold" onClick={()=>router('/')}>Quizer</h1>
            <ThemeToggle />
        </div>
    </header>
}
import Minesweeper from './components/Minesweeper'
import TopBar from './components/TopBar'

export default function App() {
    return (
        <div className="fixed size-full bg-amber-100">
            <TopBar />
            <main className="flex size-full items-center justify-center overflow-hidden p-8 pt-24">
                <div className="size-full max-h-[calc(100vw-64px)] max-w-[calc(100vh-128px)] overflow-hidden rounded-xl border-4 bg-black">
                    <Minesweeper />
                </div>
            </main>
        </div>
    )
}

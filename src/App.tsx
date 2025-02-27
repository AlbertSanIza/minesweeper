import Board from './components/Board'
import Dialog from './components/Dialog'
import TopBar from './components/TopBar'

export default function App() {
    return (
        <>
            <div className="fixed size-full bg-amber-100">
                <TopBar />
                <main className="flex size-full items-center justify-center overflow-hidden p-2 pt-18 sm:p-8 sm:pt-24">
                    <div className="size-full overflow-hidden rounded-xl border-4 bg-black sm:max-h-[calc(100vw-64px)] sm:max-w-[calc(100vh-128px)]">
                        <Board />
                    </div>
                </main>
            </div>
            <Dialog />
        </>
    )
}

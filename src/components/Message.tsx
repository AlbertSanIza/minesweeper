import { useGameStore } from '../lib/store'

export default function Message() {
    const { gameOver, gameWon, resetGame } = useGameStore()

    return gameOver || gameWon ? (
        <div className="fixed z-20 flex size-full items-center justify-center bg-black/70">
            <div className="flex flex-col items-center gap-6 rounded-xl border-4 bg-amber-100 p-8 text-2xl font-bold">
                {gameOver ? 'GAME OVER!' : gameWon ? 'YOU WON!' : ''}
                <button className="h-10 cursor-pointer rounded-xl border-4 border-black bg-red-500 px-2 font-bold hover:opacity-90" onClick={resetGame}>
                    RESET
                </button>
            </div>
        </div>
    ) : null
}

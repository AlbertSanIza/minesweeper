import { useGameStore } from '../lib/store'
import ResetButton from './ResetButton'

export default function Dialog() {
    const { gameOver, gameWon } = useGameStore()

    return gameOver || gameWon ? (
        <div className="fixed z-20 flex size-full items-center justify-center bg-black/70 text-amber-100">
            <div className="flex flex-col items-center gap-6 rounded-xl border-4 border-black bg-green-900 p-8 font-bold">
                <span className="text-3xl">{gameOver ? 'GAME OVER!' : gameWon ? 'YOU WON!' : ''}</span>
                <ResetButton />
            </div>
        </div>
    ) : null
}

import { useGameStore } from '../lib/store'
import Board from './Board'

const Minesweeper = () => {
    const { board, gameOver, gameWon, resetGame, getRemainingFlags } = useGameStore()

    return (
        <div className="">
            {/* <div className="flex flex-col items-center gap-4"></div> */}
            {/* <div className="flex w-full items-center justify-between rounded bg-gray-200 px-4 py-2">
                <span className="font-bold">Flags: {getRemainingFlags()}</span>
                <button onClick={resetGame} className="rounded bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-600">
                    Reset Game
                </button>
            </div> */}

            <Board />

            {/* {gameOver && !gameWon && <div className="text-xl font-bold text-red-500">Game Over! You hit a mine.</div>} */}

            {/* {gameWon && <div className="text-xl font-bold text-green-500">Congratulations! You won!</div>} */}
        </div>
    )
}

export default Minesweeper

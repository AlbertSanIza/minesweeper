import { FlagIcon } from 'lucide-react'
import { useState } from 'react'

import Board from './Board'

export default function App() {
    const [difficulty, setDifficulty] = useState('easy')

    return (
        <div className="fixed flex size-full flex-col bg-amber-50">
            <div className="flex h-16 w-full items-center justify-between border-b-4 border-black bg-[#4A752C] px-6 text-white">
                <select
                    className="rounded-xl border-4 border-black bg-amber-50 px-2 py-1 font-bold text-black"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="easy">EASY</option>
                    <option value="medium">MEDIUM</option>
                    <option value="hard">HARD</option>
                </select>
                <div>
                    <FlagIcon className="text-red-400" />
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-hidden p-8">
                <div className="size-full max-h-[calc(100vw-64px)] max-w-[calc(100vh-128px)] overflow-hidden rounded-xl border-4">
                    <Board
                        difficulty={difficulty}
                        onGameOver={function (won: boolean): void {
                            console.log(won ? 'You won!' : 'You lost!')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

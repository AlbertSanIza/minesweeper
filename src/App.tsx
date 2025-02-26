import { FlagIcon } from 'lucide-react'
import { useState } from 'react'

export default function App() {
    const [difficulty, setDifficulty] = useState('easy')

    const getSettings = () => {
        switch (difficulty) {
            case 'medium':
                return { rows: 14, cols: 18, mines: 40 }
            case 'hard':
                return { rows: 20, cols: 24, mines: 99 }
            case 'easy':
            default:
                return { rows: 8, cols: 10, mines: 10 }
        }
    }

    return (
        <div className="fixed flex size-full flex-col bg-amber-50">
            <div className="flex h-16 w-full items-center justify-between border-b-4 border-black bg-[#4A752C] px-6 text-white">
                <select
                    className="rounded-lg border-4 border-black bg-amber-50 px-2 py-1 font-bold text-black"
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
            <div className="flex-1">{JSON.stringify(getSettings())}</div>
        </div>
    )
}

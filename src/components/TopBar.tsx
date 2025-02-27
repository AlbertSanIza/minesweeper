import { FlagIcon } from 'lucide-react'

import { useGameStore } from '../lib/store'
import DifficultySelect from './DifficultySelect'

export default function TopBar() {
    const { resetGame, getRemainingFlags } = useGameStore()

    return (
        <div className="fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b-4 border-black bg-[#4A752C] px-6 text-white">
            <DifficultySelect />
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-xl font-bold">
                    <FlagIcon />
                    {getRemainingFlags()}
                </div>
                <button className="h-10 cursor-pointer rounded-xl border-4 border-black bg-red-500 px-2 font-bold hover:opacity-90" onClick={resetGame}>
                    RESET
                </button>
            </div>
        </div>
    )
}

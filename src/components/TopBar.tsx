import { useGameStore } from '../lib/store'
import DifficultySelect from './DifficultySelect'
import ResetButton from './ResetButton'

export default function TopBar() {
    const { getRemainingFlags } = useGameStore()

    return (
        <div className="fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b-4 border-black bg-green-900 px-6">
            <DifficultySelect />
            <div className="flex items-center gap-6">
                <div className="text-2xl font-bold text-amber-100">⛳ {getRemainingFlags()}</div>
                <ResetButton />
            </div>
        </div>
    )
}

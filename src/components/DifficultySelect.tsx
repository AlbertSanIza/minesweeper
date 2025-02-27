import { useGameStore } from '../lib/store'

export default function DifficultySelect() {
    const { difficulty, setDifficulty } = useGameStore()

    return (
        <select
            className="rounded-xl border-4 border-black bg-amber-50 px-2 py-1 font-bold text-black"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
        >
            <option value="easy">EASY</option>
            <option value="medium">MEDIUM</option>
            <option value="hard">HARD</option>
        </select>
    )
}

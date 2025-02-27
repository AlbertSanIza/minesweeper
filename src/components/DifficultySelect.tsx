import { Difficulty, useGameStore } from '../lib/store'

export default function DifficultySelect() {
    const { difficulty, setDifficulty } = useGameStore()

    return (
        <select
            className="h-10 cursor-pointer rounded-xl border-4 border-black bg-amber-50 px-2 font-bold text-black"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        >
            <option value="easy">EASY</option>
            <option value="medium">MEDIUM</option>
            <option value="hard">HARD</option>
        </select>
    )
}

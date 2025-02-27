import { useGameStore } from '../lib/store'

export default function ResetButton() {
    const { reset } = useGameStore()

    return (
        <button className="h-10 cursor-pointer rounded-xl border-4 border-black bg-red-500 px-2 font-bold text-amber-100 hover:opacity-90" onClick={reset}>
            RESET
        </button>
    )
}

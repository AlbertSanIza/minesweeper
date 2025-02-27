import DifficultySelect from './DifficultySelect'

export default function TopBar() {
    return (
        <div className="fixed flex h-16 w-full items-center justify-between border-b-4 border-black bg-[#4A752C] px-6 text-white">
            <DifficultySelect />
        </div>
    )
}

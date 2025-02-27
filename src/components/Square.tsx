import { FC } from 'react'

interface SquareProps {
    onClick: () => void
    onContextMenu: (e: React.MouseEvent) => void
    revealed: boolean
    flagged: boolean
    value?: string | number
}

const Square: FC<SquareProps> = ({ onClick, onContextMenu, revealed, flagged, value = '' }) => {
    // Different color based on number
    const getColorClass = () => {
        if (typeof value !== 'number') return ''

        const colors = [
            '', // 0 has no color
            'text-blue-600', // 1
            'text-green-600', // 2
            'text-red-600', // 3
            'text-purple-800', // 4
            'text-red-800', // 5
            'text-teal-600', // 6
            'text-black', // 7
            'text-gray-600' // 8
        ]

        return colors[value as number] || ''
    }

    return (
        <button
            className={`flex h-8 w-8 items-center justify-center border border-gray-400 font-bold ${
                revealed ? 'bg-gray-200' : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
            } ${getColorClass()}`}
            onClick={onClick}
            onContextMenu={onContextMenu}
        >
            {flagged ? '🚩' : revealed ? value : ''}
        </button>
    )
}

export default Square

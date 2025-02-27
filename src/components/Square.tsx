import { FlagIcon } from 'lucide-react'
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
            '',
            'text-blue-600',
            'text-green-600',
            'text-red-600',
            'text-purple-800',
            'text-red-800',
            'text-teal-600',
            'text-black',
            'text-gray-600'
        ]

        return colors[value as number] || ''
    }

    return (
        <button
            onClick={onClick}
            onContextMenu={onContextMenu}
            className={`flex size-full items-center justify-center ${revealed ? 'bg-gray-50' : 'cursor-pointer bg-lime-300 hover:bg-lime-800 active:bg-green-700'} ${getColorClass()}`}
        >
            {flagged ? <FlagIcon /> : revealed ? value : ''}
        </button>
    )
}

export default Square

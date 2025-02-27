import { useGameStore } from '../lib/store'
import Square from './Square'

export default function Board() {
    const { board, revealCell, flagCell } = useGameStore()

    const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
        e.preventDefault()
        flagCell(row, col)
    }

    return (
        <div className="rounded border border-gray-700">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cell, colIndex) => (
                        <Square
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => revealCell(rowIndex, colIndex)}
                            onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                            revealed={cell.revealed}
                            flagged={cell.flagged}
                            value={cell.revealed ? (cell.mine ? '💣' : cell.count > 0 ? cell.count : '') : ''}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

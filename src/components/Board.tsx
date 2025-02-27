import { MouseEvent } from 'react'

import { useGameStore } from '../lib/store'
import Cell from './Cell'

export default function Board() {
    const { board, flagCell, revealCell } = useGameStore()

    const handleRightClick = (event: MouseEvent, row: number, col: number) => {
        event.preventDefault()
        flagCell(row, col)
    }

    return (
        <div
            className="grid size-full gap-0.5"
            style={{
                gridTemplateRows: `repeat(${board.length}, 1fr)`,
                gridTemplateColumns: `repeat(${board[0].length}, 1fr)`
            }}
        >
            {board.map((row, rowIndex) => {
                return row.map((cell, colIndex) => (
                    <Cell
                        flagged={cell.flagged}
                        revealed={cell.revealed}
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => revealCell(rowIndex, colIndex)}
                        onContextMenu={(event) => handleRightClick(event, rowIndex, colIndex)}
                        value={cell.revealed ? (cell.mine ? '💣' : cell.count > 0 ? cell.count : '') : ''}
                    />
                ))
            })}
        </div>
    )
}

import { MouseEvent, useEffect, useState } from 'react'

// Define types for our game
type CellValue = number | 'mine' | null
type CellState = 'hidden' | 'revealed' | 'flagged'

interface Cell {
    value: CellValue
    state: CellState
}

interface BoardConfig {
    rows: number
    cols: number
    mines: number
}

// Board configurations for different difficulty levels
const DIFFICULTY_CONFIG: Record<string, BoardConfig> = {
    easy: { rows: 9, cols: 9, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 }
}

// Color mapping for numbers
const NUMBER_COLORS: Record<number, string> = {
    1: 'text-blue-600',
    2: 'text-green-600',
    3: 'text-red-600',
    4: 'text-purple-800',
    5: 'text-yellow-600',
    6: 'text-cyan-600',
    7: 'text-black',
    8: 'text-gray-600'
}

interface BoardProps {
    difficulty: string
    onGameOver: (won: boolean) => void
}

export default function Board({ difficulty, onGameOver = () => {} }: BoardProps) {
    const config = DIFFICULTY_CONFIG[difficulty]
    const [board, setBoard] = useState<Cell[][]>([])
    const [gameOver, setGameOver] = useState(false)
    const [firstClick, setFirstClick] = useState(true)

    // Initialize empty board
    useEffect(() => {
        initializeBoard()
        setGameOver(false)
        setFirstClick(true)
    }, [difficulty])

    const initializeBoard = () => {
        const newBoard: Cell[][] = []
        for (let i = 0; i < config.rows; i++) {
            const row: Cell[] = []
            for (let j = 0; j < config.cols; j++) {
                row.push({
                    value: null,
                    state: 'hidden'
                })
            }
            newBoard.push(row)
        }
        setBoard(newBoard)
    }

    // Place mines and calculate numbers
    const setupBoard = (firstRow: number, firstCol: number) => {
        const newBoard = JSON.parse(JSON.stringify(board))
        let minesPlaced = 0

        // Place mines randomly, avoiding the first clicked cell
        while (minesPlaced < config.mines) {
            const row = Math.floor(Math.random() * config.rows)
            const col = Math.floor(Math.random() * config.cols)

            // Skip if it's the first clicked cell or already has a mine
            if ((row === firstRow && col === firstCol) || newBoard[row][col].value === 'mine') {
                continue
            }

            newBoard[row][col].value = 'mine'
            minesPlaced++
        }

        // Calculate numbers for each cell
        for (let i = 0; i < config.rows; i++) {
            for (let j = 0; j < config.cols; j++) {
                if (newBoard[i][j].value === 'mine') continue

                const mineCount = countAdjacentMines(newBoard, i, j)
                newBoard[i][j].value = mineCount === 0 ? null : mineCount
            }
        }

        setBoard(newBoard)
    }

    const countAdjacentMines = (board: Cell[][], row: number, col: number) => {
        let count = 0
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i
                const newCol = col + j
                if (newRow >= 0 && newRow < config.rows && newCol >= 0 && newCol < config.cols && board[newRow][newCol].value === 'mine') {
                    count++
                }
            }
        }
        return count
    }

    const handleCellClick = (row: number, col: number) => {
        if (gameOver || board[row][col].state === 'flagged') return

        // First click setup
        if (firstClick) {
            setFirstClick(false)
            setupBoard(row, col)
            // Reveal the cell in the next render cycle
            setTimeout(() => revealCell(row, col), 0)
            return
        }

        const cell = board[row][col]
        if (cell.state === 'revealed') return

        if (cell.value === 'mine') {
            // Game over - reveal all mines
            revealAllMines()
            setGameOver(true)
            onGameOver(false)
            return
        }

        revealCell(row, col)
    }

    const handleCellRightClick = (e: MouseEvent, row: number, col: number) => {
        e.preventDefault()
        if (gameOver || board[row][col].state === 'revealed') return

        const newBoard = [...board]
        const cell = newBoard[row][col]
        cell.state = cell.state === 'flagged' ? 'hidden' : 'flagged'
        setBoard(newBoard)

        checkWinCondition(newBoard)
    }

    const revealCell = (row: number, col: number) => {
        if (row < 0 || row >= config.rows || col < 0 || col >= config.cols || board[row][col].state !== 'hidden') {
            return
        }

        const newBoard = [...board]
        newBoard[row][col].state = 'revealed'
        setBoard(newBoard)

        // If it's an empty cell, reveal adjacent cells
        if (newBoard[row][col].value === null) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    revealCell(row + i, col + j)
                }
            }
        }

        checkWinCondition(newBoard)
    }

    const revealAllMines = () => {
        const newBoard = [...board]
        for (let i = 0; i < config.rows; i++) {
            for (let j = 0; j < config.cols; j++) {
                if (newBoard[i][j].value === 'mine') {
                    newBoard[i][j].state = 'revealed'
                }
            }
        }
        setBoard(newBoard)
    }

    const checkWinCondition = (currentBoard: Cell[][]) => {
        for (let i = 0; i < config.rows; i++) {
            for (let j = 0; j < config.cols; j++) {
                const cell = currentBoard[i][j]
                if (cell.value !== 'mine' && cell.state !== 'revealed') {
                    return false
                }
            }
        }

        // All non-mine cells are revealed - win!
        setGameOver(true)
        onGameOver(true)
        return true
    }

    const renderCell = (cell: Cell, row: number, col: number) => {
        let content = null
        let cellClass = 'flex items-center justify-center h-full w-full select-none'

        if (cell.state === 'hidden') {
            cellClass += ' bg-[#AAD750] hover:bg-[#A2CF4A] active:bg-[#9BC446]'
        } else if (cell.state === 'revealed') {
            cellClass += ' bg-[#E5C29F]'

            if (cell.value === 'mine') {
                content = <div className="size-3/4 rounded-full bg-black" />
            } else if (cell.value) {
                const colorClass = NUMBER_COLORS[cell.value as number] || ''
                content = <span className={`font-bold ${colorClass}`}>{cell.value}</span>
            }
        } else if (cell.state === 'flagged') {
            cellClass += ' bg-[#AAD750]'
            content = <div className="size-3/4 rounded-full bg-red-500" />
        }

        return (
            <div
                key={`${row}-${col}`}
                className={`border border-[#85A641] ${cellClass}`}
                onClick={() => handleCellClick(row, col)}
                onContextMenu={(e) => handleCellRightClick(e, row, col)}
            >
                {content}
            </div>
        )
    }

    return (
        <div
            className="grid h-full w-full gap-0.5 bg-black"
            style={{
                gridTemplateRows: `repeat(${config.rows}, 1fr)`,
                gridTemplateColumns: `repeat(${config.cols}, 1fr)`
            }}
        >
            {board.map((row, rowIndex) => row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex)))}
        </div>
    )
}

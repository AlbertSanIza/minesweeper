import { create } from 'zustand'

export enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
}

interface Cell {
    mine: boolean
    count: number
    revealed: boolean
    flagged: boolean
}

const settings = {
    [Difficulty.Easy]: { rows: 8, cols: 8, mines: 11 },
    [Difficulty.Medium]: { rows: 12, cols: 12, mines: 22 },
    [Difficulty.Hard]: { rows: 16, cols: 16, mines: 40 }
}

export const useGameStore = create<{
    difficulty: Difficulty
    board: Cell[][]
    gameOver: boolean
    gameWon: boolean
    setDifficulty: (difficulty: Difficulty) => void
    reset: () => void
    flag: (row: number, col: number) => void
    reveal: (row: number, col: number) => void
    getRemainingFlags: () => number
}>((set, get) => {
    const savedDifficulty = (localStorage.getItem('difficulty') as Difficulty) || Difficulty.Easy

    return {
        difficulty: savedDifficulty,
        board: generateBoard(savedDifficulty),
        gameOver: false,
        gameWon: false,

        setDifficulty: (difficulty) => {
            localStorage.setItem('difficulty', difficulty)
            set({ difficulty, board: generateBoard(difficulty), gameOver: false, gameWon: false })
        },

        reset: () => {
            set({ board: generateBoard(get().difficulty), gameOver: false, gameWon: false })
        },

        flag: (row, col) => {
            const { board } = get()
            if (board[row][col].revealed) {
                return
            }
            const newBoard = JSON.parse(JSON.stringify(board))
            newBoard[row][col].flagged = !newBoard[row][col].flagged
            set({ board: newBoard })
        },

        reveal: (row, col) => {
            const { board } = get()
            if (board[row][col].revealed || board[row][col].flagged) {
                return
            }
            const newBoard = JSON.parse(JSON.stringify(board))
            if (newBoard[row][col].mine) {
                newBoard.forEach((row: Cell[]) => {
                    row.forEach((cell) => {
                        if (cell.mine) {
                            cell.revealed = true
                        }
                    })
                })
                set({ board: newBoard, gameOver: true })
                return
            }
            const revealRecursive = (board: Cell[][], r: number, c: number) => {
                const { rows, cols } = settings[get().difficulty]
                if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c].revealed || board[r][c].flagged) {
                    return
                }
                board[r][c].revealed = true
                if (board[r][c].count === 0) {
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            revealRecursive(board, r + i, c + j)
                        }
                    }
                }
            }
            revealRecursive(newBoard, row, col)
            set({ board: newBoard, gameWon: checkWinCondition(newBoard) })
        },

        getRemainingFlags: () => {
            const { board, difficulty } = get()
            return settings[difficulty].mines - board.reduce((acc, row) => acc + row.filter((cell) => cell.flagged).length, 0)
        }
    }
})

function generateBoard(difficulty: Difficulty): Cell[][] {
    const { rows, cols, mines } = settings[difficulty]

    // Create empty board with all cells initialized
    const board: Cell[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
            mine: false,
            count: 0,
            revealed: false,
            flagged: false
        }))
    )

    // Place mines
    let placedMines = 0
    while (placedMines < mines) {
        const row = Math.floor(Math.random() * rows)
        const col = Math.floor(Math.random() * cols)

        if (!board[row][col].mine) {
            board[row][col].mine = true
            placedMines++

            // Update adjacent cells' mine count
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i
                    const newCol = col + j

                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        board[newRow][newCol].count++
                    }
                }
            }
        }
    }

    return board
}

function checkWinCondition(board: Cell[][]): boolean {
    for (const row of board) {
        for (const cell of row) {
            if (!cell.mine && !cell.revealed) {
                return false
            }
        }
    }
    return true
}

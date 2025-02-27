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
    flagsPlaced: number
    setDifficulty: (difficulty: Difficulty) => void
    reset: () => void
    reveal: (row: number, col: number) => void
    flag: (row: number, col: number) => void
    getRemainingFlags: () => number
}>((set, get) => {
    const savedDifficulty = (localStorage.getItem('difficulty') as Difficulty) || Difficulty.Easy

    return {
        difficulty: savedDifficulty,
        board: generateBoard(savedDifficulty),
        gameOver: false,
        gameWon: false,
        flagsPlaced: 0,

        setDifficulty: (difficulty) => {
            localStorage.setItem('difficulty', difficulty)
            set({
                difficulty,
                board: generateBoard(difficulty),
                gameOver: false,
                gameWon: false,
                flagsPlaced: 0
            })
        },

        reset: () => {
            set({
                board: generateBoard(get().difficulty),
                gameOver: false,
                gameWon: false,
                flagsPlaced: 0
            })
        },

        reveal: (row, col) => {
            const { board, gameOver } = get()

            // Don't do anything if game is over or cell is already revealed or flagged
            if (gameOver || board[row][col].revealed || board[row][col].flagged) {
                return
            }

            // Create a new board to update
            const newBoard = JSON.parse(JSON.stringify(board))

            // Check if mine is clicked
            if (newBoard[row][col].mine) {
                // Reveal all mines
                newBoard.forEach((row: Cell[]) => {
                    row.forEach((cell) => {
                        if (cell.mine) {
                            cell.revealed = true
                        }
                    })
                })

                set({
                    board: newBoard,
                    gameOver: true
                })
                return
            }

            // Recursively reveal cells
            const revealRecursive = (board: Cell[][], r: number, c: number) => {
                const { rows, cols } = settings[get().difficulty]

                if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c].revealed || board[r][c].flagged) {
                    return
                }

                board[r][c].revealed = true

                // If this is a zero, reveal adjacent cells
                if (board[r][c].count === 0) {
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            revealRecursive(board, r + i, c + j)
                        }
                    }
                }
            }

            revealRecursive(newBoard, row, col)

            set({
                board: newBoard,
                gameWon: checkWinCondition(newBoard)
            })
        },

        flag: (row, col) => {
            const { board, gameOver, flagsPlaced } = get()

            // Don't do anything if game is over or cell is already revealed
            if (gameOver || board[row][col].revealed) {
                return
            }

            // Create a new board to update
            const newBoard = JSON.parse(JSON.stringify(board))

            // Toggle flag
            newBoard[row][col].flagged = !newBoard[row][col].flagged

            // Update flag count
            const newFlagsPlaced = flagsPlaced + (newBoard[row][col].flagged ? 1 : -1)

            set({
                board: newBoard,
                flagsPlaced: newFlagsPlaced
            })
        },

        getRemainingFlags: () => {
            const { difficulty, flagsPlaced } = get()
            return settings[difficulty].mines - flagsPlaced
        }
    }
})

// Helper function to generate a new board based on difficulty
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

// Helper function to check if the game is won
function checkWinCondition(board: Cell[][]): boolean {
    for (const row of board) {
        for (const cell of row) {
            // If there's a non-mine cell that's not revealed, the game is not won yet
            if (!cell.mine && !cell.revealed) {
                return false
            }
        }
    }
    return true
}

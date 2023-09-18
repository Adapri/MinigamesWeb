import { useState } from 'react'
import './App.css'
import { Square } from './componets/Square'
import { TURNS, WIN_COMBOS } from './logic/constants'
import { Players } from './componets/Players'

function App () {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null))
  const [turn, setTurn] = useState<string>(TURNS.X)
  const [winner, setWinner] = useState<string | null>(null)

  const checkEndBoard = (boardToCheck: string[]) => {
    return boardToCheck.every((square: string | null) => square !== null)
  }

  const checkWinnerFromBoard = (boardToCheck: string[]) => {
    for (const combos of WIN_COMBOS) {
      const [a, b, c] = combos

      if (boardToCheck[a] !== '' &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }

    return null
  }

  const updateBoard = (index: number) => {
    if (board[index] !== null || winner !== null) return
    const newBoard: string[] = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn: string = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinnerFromBoard(newBoard)

    if (newWinner !== null) {
      setWinner(newWinner)
    } else if (checkEndBoard(newBoard)) {
      setWinner('-')
    }

    console.log(newWinner)
  }
  return (
    <main className='tic-tac-toe'>
      <h1>Tic Tac Toe</h1>

      <header className='players'>
        <Players turn={turn}/>
      </header>
      <section className='board'>
          {
            board.map((_, index: number) => {
              return (
                <Square
                      key={index}
                      updateBoard={updateBoard}
                      index={index}
                >
                  {board[index]}
                </Square>

              )
            }
            )
          }
      </section>
    </main>

  )
}

export default App

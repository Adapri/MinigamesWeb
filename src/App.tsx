import { useState } from 'react'
import './App.css'
import { Square } from './componets/Square'

enum TURNS {
  X = 'x',
  O = 'o',
}

function App () {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null))
  const [turn, setTurn] = useState<string>(TURNS.X)
  const updateBoard = (index: number) => {
    if (board[index] !== null) return
    const newBoard: string[] = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn: string = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }
  return (
    <main className='tic-tac-toe'>
      <h1>Tic Tac Toe</h1>
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

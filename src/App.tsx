import { useState } from 'react'
import './App.css'
import { TURNS } from './logic/constants'
import { Players } from './componets/Players'
import { WinnerModal } from './componets/WinnerModal'
import { Board } from './componets/Board'
import { checkEndBoard, checkWinnerFromBoard } from './logic/board'

function App () {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null))
  const [turn, setTurn] = useState<string>(TURNS.X)
  const [winner, setWinner] = useState<string | null>(null)

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

  const restartGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  return (
    <main className='tic-tac-toe'>
      <header>
        <Players turn={turn}/>
      </header>
      <section className='winner'>
        <WinnerModal winner={winner}/>
      </section>
      <section className='board'>
        <Board board={board} updateBoard={updateBoard}/>
      </section>
      <footer className='options'>
          {winner !== null && <button onClick={restartGame}>Revancha</button>}
      </footer>
    </main>

  )
}

export default App

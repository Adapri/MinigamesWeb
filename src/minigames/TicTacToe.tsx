import { useState, useEffect } from 'react'
import { TURNS } from '../logic/constants'
import { Players } from '../componets/Players'
import { WinnerModal } from '../componets/WinnerModal'
import { Board } from '../componets/Board'
import { checkEndBoard, checkWinnerFromBoard } from '../logic/board'
import { Options } from '../componets/Options'
import { TicTacToe_IA } from '../IA/TicTacToe'

export function TicTaToe () {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null))
  const [turn, setTurn] = useState<string>(TURNS.X)
  const [winner, setWinner] = useState<string | null>(null)
  const [IA] = useState<TicTacToe_IA>(new TicTacToe_IA(board))

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
  }

  const restartGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  useEffect(() => {
    if (winner !== null) {
      IA.finishGame(winner)
    } else if (turn === TURNS.O) {
      const movement = IA.chooseMovement([...board])
      updateBoard(movement)
    }
  }, [turn, winner])

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
      <section className='options'>
         <Options winner={winner} restartGame={restartGame}/>
      </section>
    </main>
  )
}

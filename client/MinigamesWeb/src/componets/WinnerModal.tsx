import { TURNS } from '../logic/constants'

interface WinnerModalProps {
  winner: string | null
}

export function WinnerModal ({ winner }: WinnerModalProps) {
  return (
    <>
        {winner === '-' && <strong>Empate</strong> }
        {winner === TURNS.X && <strong>Ha ganado Jugador 1</strong> }
        {winner === TURNS.O && <strong>Ha ganado Jugador 2</strong> }
    </>
  )
}

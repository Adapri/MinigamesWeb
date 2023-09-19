interface OptionProps {
  winner: string | null
  restartGame: () => void
}

export function Options ({ winner, restartGame }: OptionProps) {
  return (
        <>
        <button onClick={restartGame}>{winner === null ? 'Reiniciar' : 'Revancha'}</button>
        </>

  )
}

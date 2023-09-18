import { TURNS } from '../logic/constants'

interface PlayersProps {
  turn: string
}

export function Players ({ turn }: PlayersProps) {
  return (
        <section className='players'>
        <div className='player-info'>
          <span className={turn === TURNS.X ? 'current-turn' : 'turn'}>{TURNS.X}</span>
          <strong>Jugador 1</strong>
        </div>
        <div className='player-info'>
          <span className={turn === TURNS.O ? 'current-turn' : 'turn'}>{TURNS.O}</span>
          <strong>Jugador 2</strong>
        </div>

      </section>
  )
}

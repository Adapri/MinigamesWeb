import { Square } from './Square'

interface BoardProps {
  board: string[]
  updateBoard: (index: number) => void
}

export function Board ({ board, updateBoard }: BoardProps) {
  return (
        <>
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
        </>

  )
}

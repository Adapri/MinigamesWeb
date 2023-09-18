interface SquareProps {
  children: React.ReactNode
  index: number
  updateBoard: (index: number) => void
}

export function Square ({ children, index, updateBoard }: SquareProps) {
  const handleClick = () => {
    updateBoard(index)
  }

  return (
        <div onClick={handleClick} className={'square'}>
            {children}
        </div>
  )
}

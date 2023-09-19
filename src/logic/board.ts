import { WIN_COMBOS } from './constants'

export const checkEndBoard = (boardToCheck: string[]) => {
  return boardToCheck.every((square: string) => square !== null)
}

export const checkWinnerFromBoard = (boardToCheck: string[]) => {
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

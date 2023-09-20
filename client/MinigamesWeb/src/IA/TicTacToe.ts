import { TURNS } from '../logic/constants'

interface BoardState {
  board: string[]
  prob: number[]
}

export class TicTacToe_IA {
  private boardStates: BoardState[]
  private readonly randomProb: number
  private readonly states: number[]
  private readonly movements: number[]
  private readonly learningRate: number

  constructor (board: string[]) {
    this.boardStates = []
    this.boardStates.push({ board, prob: Array(9).fill(0.5) })
    this.randomProb = 0.3
    this.states = []
    this.movements = []
    this.learningRate = 0.001
  }

  private checkNewState (board: string[]) {
    const index = this.boardStates.findIndex((state) => JSON.stringify(state.board) === JSON.stringify(board))
    if (index === -1) {
      const newProb = board.map((_, index) => {
        return board[index] === null ? 0.5 : 0
      })

      const newState: BoardState = {
        board,
        prob: newProb
      }
      this.boardStates.push(newState)

      return this.boardStates.length - 1
    }

    return index
  }

  private updateRewards (reward: number) {
    for (let i = this.states.length - 1; i >= 0; i--) {
      const newState = this.boardStates[this.states[i]]
      let newProb = newState.prob[this.movements[i]] + this.learningRate * (reward - newState.prob[this.movements[i]])
      if (newProb < 0) {
        newProb = 0
      } else if (newProb > 1) {
        newProb = 1
      }
      newState.prob[this.movements[i]] = newProb
      this.boardStates[this.states[i]] = newState
    }
  }

  public chooseMovement (board: string[]) {
    const indexState: number = this.checkNewState(board)

    const random: boolean = Math.random() <= this.randomProb
    let newMovement: number

    if (random) {
      do {
        newMovement = Math.floor(Math.random() * 8)
      } while (board[newMovement] !== null)
    } else {
      const stateProbs: number[] = this.boardStates[indexState].prob

      const maxProbstateProbs = Math.max(...stateProbs)
      newMovement = stateProbs.indexOf(maxProbstateProbs)
    }

    this.states.push(indexState)
    this.movements.push(newMovement)

    return newMovement
  }

  public finishGame (winner: string) {
    let reward: number = 0
    switch (winner) {
      case '-': reward = 50; break
      case TURNS.X: reward = -100; break
      case TURNS.O: reward = 100; break
    }

    this.updateRewards(reward)
  }

  public getBoardStates () {
    return this.boardStates
  }
}

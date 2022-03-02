export function useSnake() {
  const defaultCell = {x: 4, y: 4}

  const snake = Vue.reactive({
    direction: null,
    cells: [defaultCell]
  })

  function isSnake(x, y) {
    return !!this.snake.cells.find(c => c.x === x && c.y === y)
  }

  return {
    snake,
    defaultCell,
    isSnake
  }
}
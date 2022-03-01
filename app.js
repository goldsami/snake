const App = {
  data() {
    return {
      gameSpeed: 500,
      snake: {
        direction: null,
        cells: []
      },
      food: null,
      timeoutId: null
    };
  },
  methods: {
    start() {
      this.snake.cells = [
          {x: 3, y: 3}, {x: 3, y: 4}, {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 5, y: 6}, {x: 5, y: 7}
      ]
      if (this.timeoutId) clearInterval((this.timeoutId))
      this.timeoutId = setInterval(() => {
        console.log('interval')
        if (this.snake.direction) {
          this.makeStep()
        }
      }, this.gameSpeed)
    },
    isSnake(x, y) {
      return !!this.snake.cells.find(c => c.x === x && c.y === y)
    },
    makeStep() {
      let newCell;
      switch (this.snake.direction) {
        case 'up':
          newCell = {
            x: this.returnInRange(this.snake.cells[0].x - 1),
            y: this.returnInRange(this.snake.cells[0].y)
          }
          this.snake.cells.pop()
          break
        case 'left':
          newCell = {
            x: this.returnInRange(this.snake.cells[0].x),
            y: this.returnInRange(this.snake.cells[0].y - 1)
          }
          this.snake.cells.pop()
          break
        case 'down':
          newCell = {
            x: this.returnInRange(this.snake.cells[0].x + 1),
            y: this.returnInRange(this.snake.cells[0].y)
          }
          this.snake.cells.pop()
          break
        case 'right':
          newCell = {
            x: this.returnInRange(this.snake.cells[0].x),
            y: this.returnInRange(this.snake.cells[0].y + 1)
          }
          this.snake.cells.pop()
          break
      }
      if (this.isSnake(newCell.x, newCell.y)) {
        this.endGame()
      }
      this.snake.cells.unshift(newCell);
    },
    spacePressHandler(e) {
      if (e.code === 'Space') {
        this.start()
      }
    },
    directionPressHandler(e) {
      switch (e.code) {
        case 'KeyW':
          if (this.snake.direction === 'down') return
          this.snake.direction = 'up'
          break
        case 'KeyA':
          if (this.snake.direction === 'right') return
          this.snake.direction = 'left'
          break
        case 'KeyS':
          if (this.snake.direction === 'up') return
          this.snake.direction = 'down'
          break
        case 'KeyD':
          if (this.snake.direction === 'left') return
          this.snake.direction = 'right'
          break
      }
    },
    returnInRange(value, start = 1, end = 10) {
      if (value > end) return value - end
      else if (value < start) return  value + end
      else  return  value
    },
    endGame() {
      alert('Mortis')
      clearInterval(this.timeoutId)
      this.snake.direction = null
    },
    generateFood() {

    }
  },
  created() {
    document.addEventListener('keyup', this.spacePressHandler)
    document.addEventListener('keyup', this.directionPressHandler)
  },
  unmounted() {
    document.removeEventListener('keyup', this.spacePressHandler)
    document.removeEventListener('keyup', this.directionPressHandler)
    if (this.timeoutId) clearInterval((this.timeoutId))
  }
}

Vue.createApp(App).mount('#app')

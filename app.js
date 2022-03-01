const App = {
  data() {
    return {
      gameSpeed: 500,
      snake: {
        direction: null,
        cells: [
          {x: 5, y: 5}
        ]
      },
      timeoutId: null
    };
  },
  methods: {
    start() {
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
      switch (this.snake.direction) {
        case 'up':
          this.snake.cells.unshift({
            x: this.returnInRange(this.snake.cells[0].x - 1),
            y: this.returnInRange(this.snake.cells[0].y)
          })
          this.snake.cells.pop()
          break
        case 'left':
          this.snake.cells.unshift({
            x: this.returnInRange(this.snake.cells[0].x),
            y: this.returnInRange(this.snake.cells[0].y - 1)
          })
          this.snake.cells.pop()
          break
        case 'down':
          this.snake.cells.unshift({
            x: this.returnInRange(this.snake.cells[0].x + 1),
            y: this.returnInRange(this.snake.cells[0].y)
          })
          this.snake.cells.pop()
          break
        case 'right':
          this.snake.cells.unshift({
            x: this.returnInRange(this.snake.cells[0].x),
            y: this.returnInRange(this.snake.cells[0].y + 1)
          })
          this.snake.cells.pop()
          break
      }
    },
    spacePressHandler(e) {
      if (e.code === 'Space') {
        this.start()
      }
    },
    directionPressHandler(e) {
      switch (e.code) {
        case 'KeyW':
          this.snake.direction = 'up'
          break
        case 'KeyA':
          this.snake.direction = 'left'
          break
        case 'KeyS':
          this.snake.direction = 'down'
          break
        case 'KeyD':
          this.snake.direction = 'right'
          break
      }
    },
    returnInRange(value, start = 1, end = 10) {
      if (value > end) return value - end
      else if (value < start) return  value + end
      else  return  value
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

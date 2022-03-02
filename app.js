const App = {
  data() {
    return {
      gameSpeed: 500,
      snake: {
        direction: null,
        cells: []
      },
      food: null,
      timeoutId: null,
      field: [],
      set maxScore(val) {
        localStorage.setItem('maxScore', val)
      },
      get maxScore() {
        return localStorage.getItem('maxScore') || 0
      },
      allowChangeDir: true,
    };
  },
  computed: {
    score() {
      return this.snake.cells.length - 1
    },
  },
  methods: {
    start() {
      this.snake.cells = [
          {x: 3, y: 3}
      ]
      this.generateFood()
      if (this.timeoutId) clearInterval((this.timeoutId))
      this.timeoutId = setInterval(() => {
        console.log('interval')
        if (this.snake.direction) {
          this.makeStep()
        }
      }, this.gameSpeed)
    },
    generateFood() {
      const freeCells = this.field.filter(val => !this.isSnake(val.x, val.y))
      const foodCellIndex = Math.floor(Math.random() * freeCells.length) + 1
      this.food = freeCells[foodCellIndex]
    },
    isSnake(x, y) {
      return !!this.snake.cells.find(c => c.x === x && c.y === y)
    },
    isSnakeHead(x, y) {
      return this.snake.cells[0]?.x === x && this.snake.cells[0].y === y;
    },
    isFood(x, y) {
      return this.food?.x === x && this.food?.y === y
    },
    makeStep() {
      let newCell;
      switch (this.snake.direction) {
        case 'up':
          newCell = {
            x: this.returnInRange(this.snake.cells[0].x - 1),
            y: this.returnInRange(this.snake.cells[0].y)
          }
          break
        case 'left':
          newCell = {
            x: this.returnInRange(this.snake.cells[0].x),
            y: this.returnInRange(this.snake.cells[0].y - 1)
          }
          break
        case 'down':
          newCell = {
            x: this.returnInRange(this.snake.cells[0].x + 1),
            y: this.returnInRange(this.snake.cells[0].y)
          }
          break
        case 'right':
          newCell = {
            x: this.returnInRange(this.snake.cells[0].x),
            y: this.returnInRange(this.snake.cells[0].y + 1)
          }
          break
      }
      if (this.isSnake(newCell.x, newCell.y)) {
        this.endGame()
        return
      }
      this.snake.cells.unshift(newCell);
      if (this.isFood(newCell.x, newCell.y)) {
        this.generateFood()
      } else {
        this.snake.cells.pop()
      }
      this.allowChangeDir = true
    },
    spacePressHandler(e) {
      if (e.code === 'Space') {
        this.start()
      }
    },
    directionPressHandler(e) {
      if (!this.allowChangeDir) return
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
      this.allowChangeDir = false
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
      if (this.score > this.maxScore) {
        this.maxScore = this.score
      }
    },
  },
  created() {
    document.addEventListener('keyup', this.spacePressHandler)
    document.addEventListener('keyup', this.directionPressHandler)
  },
  mounted() {
    this.field =  Array(10).fill().map((a,i) => {
      return Array(10).fill().map((_, j) => ({x: i+1, y: j+1}))
    }).flat()
  },
  unmounted() {
    document.removeEventListener('keyup', this.spacePressHandler)
    document.removeEventListener('keyup', this.directionPressHandler)
    if (this.timeoutId) clearInterval((this.timeoutId))
  }
}

Vue.createApp(App).mount('#app')

import { useSnake } from './use/snake.js'

const App = {
  setup() {
    return {
      ...useSnake(),
    }
  },
  data() {
    return {
      gameSpeed: 500,
      fieldLen: 10,
      food: null,
      intervalId: null,
      field: [],
      set maxScore(val) {
        localStorage.setItem('maxScore', val)
      },
      get maxScore() {
        return localStorage.getItem('maxScore') || 0
      },
      allowChangeDir: true,
      gameStarted: false,
    };
  },
  computed: {
    score() {
      return this.snake.cells.length - 1
    },
  },
  methods: {
    start() {
      if (this.gameStarted) return

      this.gameStarted = true
      this.allowChangeDir = true
      this.snake.cells = [
        this.defaultCell
      ]
      this.generateFood()
      this.clearInterval()
      this.intervalId = setInterval(() => {
        if (this.snake.direction) {
          this.makeStep()
        }
      }, this.gameSpeed)
    },
    generateFood() {
      const freeCells = this.field.filter(val => !this.isSnake(val.x, val.y))
      if (!freeCells.length) {
        this.endGame()
        setTimeout(() => alert('You win'))
        return
      }
      const foodCellIndex = Math.floor(Math.random() * freeCells.length)
      this.food = freeCells[foodCellIndex]
    },
    isFood(x, y) {
      return this.food?.x === x && this.food?.y === y
    },
    makeStep() {
      let newCell;
      switch (this.snake.direction) {
        case 'up':
          newCell = {
            x: this.returnRandInRange(this.snake.cells[0].x - 1),
            y: this.returnRandInRange(this.snake.cells[0].y)
          }
          break
        case 'left':
          newCell = {
            x: this.returnRandInRange(this.snake.cells[0].x),
            y: this.returnRandInRange(this.snake.cells[0].y - 1)
          }
          break
        case 'down':
          newCell = {
            x: this.returnRandInRange(this.snake.cells[0].x + 1),
            y: this.returnRandInRange(this.snake.cells[0].y)
          }
          break
        case 'right':
          newCell = {
            x: this.returnRandInRange(this.snake.cells[0].x),
            y: this.returnRandInRange(this.snake.cells[0].y + 1)
          }
          break
      }
      if (this.isSnake(newCell.x, newCell.y)) {
        alert('Mortis')
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
      console.log('dir press', this.allowChangeDir)
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
        default:
          return
      }
      this.allowChangeDir = false
    },
    returnRandInRange(value, start = 1, end = this.fieldLen) {
      if (value > end) return value - end
      else if (value < start) return value + end
      else return value
    },
    clearInterval() {
      console.log('cl int', this.intervalId);
      if (this.intervalId) clearInterval(this.intervalId)
    },
    endGame() {
      this.clearInterval()
      this.gameStarted = false
      this.food = null
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
    this.field = Array(this.fieldLen).fill().map((a, i) => {
      return Array(this.fieldLen).fill().map((_, j) => ({ x: i + 1, y: j + 1 }))
    }).flat()
  },
  unmounted() {
    document.removeEventListener('keyup', this.spacePressHandler)
    document.removeEventListener('keyup', this.directionPressHandler)
    this.clearInterval()
  }
}

Vue.createApp(App).mount('#app')

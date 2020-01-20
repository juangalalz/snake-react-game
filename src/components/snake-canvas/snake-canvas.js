import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './snake-canvas.scss';
import * as actions from '../../redux/actions'

const SQUARE_SIZE = 16;
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
const REDUCE_VALUE = 113;
const START_VALUE = 800;

class SnakeCanvas extends Component {

  constructor() {
    super();
    this.snake = [];
    this.food = {};
    this.game = null;
    this.intervalFood = null;
    this.state = {
      newHighestScore: false,
      score: 0,
      snakeContainer: START_VALUE,
      bloks: Math.floor(START_VALUE / SQUARE_SIZE),
      direction: UP_KEY, // 37 left, 38 up, 39 right, 40 down
    };
    this.snakeContainerRef = React.createRef();
  }

  componentDidMount() {
    this.props.provideCtrl({
      restartGame: () => this.restartGame()
    });
    document.addEventListener("keydown", this.handleKeyDown);
    this.loadData();
    this.startGame();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  loadData() {
    this.props.actions.getScore()
  }

  startGame = () => {
    const { bloks } = this.state;
    this.snake[0] = {
      x: Math.floor(bloks / 2)  * SQUARE_SIZE,
      y: Math.floor(bloks / 2) * SQUARE_SIZE
    }
    this.food = {
      x: Math.floor(Math.random() * bloks) * SQUARE_SIZE,
      y: Math.floor(Math.random() * bloks) * SQUARE_SIZE
    }

    this.game = setInterval(() => {
      this.draw()
    }, 100);

    this.initIntervalFood();

  }

  initIntervalFood = () => {
    let foodIntervalTime = (Math.floor(Math.random() * (10 - 4 + 1) ) + 4) * 1000;
    this.intervalFood = setInterval(() => {
      this.updateFood();
    }, foodIntervalTime);
  }

  restartGame = () => {
    this.snake = [];
    this.food = {};
    this.game = null;
    this.intervalFood = null;
    this.setState({
      newHighestScore: false,
      score: 0,
      snakeContainer: START_VALUE,
      bloks: Math.floor(START_VALUE / SQUARE_SIZE),
      direction: 0,
    }, () => {
      this.startGame();
    })
  }

  endGame = () => {
    clearInterval(this.game);
    clearInterval(this.intervalFood);
    this.props.updateGameOver(true);
  }

  contactsItself = (newHead) => {
    for (let i = 0; i < this.snake.length; i++) {
      if(newHead.x === this.snake[i].x && newHead.y === this.snake[i].y) {
        return true;
      }
    }
    return false;
  }

  updateFood = () => {
    const { bloks } = this.state;
    this.food = {
      x: Math.floor(Math.random() * bloks) * SQUARE_SIZE,
      y: Math.floor(Math.random() * bloks) * SQUARE_SIZE
    }
  }

  drawSnake = (snakeContext) => {
    for (let i = 0; i < this.snake.length; i++) {
      snakeContext.fillStyle = i === 0 ? "#000066" : "#4285C9";
      snakeContext.fillRect(this.snake[i].x, this.snake[i].y, SQUARE_SIZE, SQUARE_SIZE);
    }
    snakeContext.fillStyle = "#4285C9";
    snakeContext.fillRect(this.food.x, this.food.y, SQUARE_SIZE, SQUARE_SIZE);
  }

  changeSnakeDirection = (direction, snakeContainer) => {
    if (snakeContainer < REDUCE_VALUE) {
      this.endGame();
    }
    this.snake.reverse()
    let newDirection;
    switch(direction) {
      case LEFT_KEY:
        newDirection = RIGHT_KEY
        break;
      case DOWN_KEY:
        newDirection = UP_KEY
        break;
      case RIGHT_KEY:
        newDirection = LEFT_KEY
        break;
      default:
        newDirection = DOWN_KEY
        break;
    }
    let newBloks = Math.floor((snakeContainer - REDUCE_VALUE) / SQUARE_SIZE);
    let newSnakeContainer = newBloks * SQUARE_SIZE;
    let realReduce = snakeContainer - newSnakeContainer;
    this.food = {
      x: Math.floor(Math.random() * newBloks) * SQUARE_SIZE,
      y: Math.floor(Math.random() * newBloks) * SQUARE_SIZE
    }
    for (let i = 0; i < this.snake.length; i++) {
      if(direction === RIGHT_KEY) {
        this.snake[i].x = this.snake[i].x - realReduce;
        if(this.snake[i].y >= this.state.snakeContainer - realReduce) {
          this.snake[i].y = this.snake[i].y - realReduce;
        }
      }
      if(direction === DOWN_KEY) {
        this.snake[i].y = this.snake[i].y - realReduce;
        if(this.snake[i].x >= this.state.snakeContainer - realReduce) {
          this.snake[i].x = this.snake[i].x - realReduce;
        }
      }
    }
    this.setState({
      snakeContainer: newBloks * SQUARE_SIZE,
      bloks: newBloks,
      direction: newDirection
    })
  }

  growSnake = (score, highestScore, bloks) => {
    clearInterval(this.intervalFood);
    let newScore = score + 1;
    this.setState({
      score: newScore
    })
    this.props.updateScore(newScore);
    if(highestScore === null || highestScore.score < newScore) {
      this.setState({
        newHighestScore: true
      })
      this.props.updateNewHighestScore(true);
      this.props.actions.setScore(newScore);
    }
    this.food = {
      x: Math.floor(Math.random() * bloks) * SQUARE_SIZE,
      y: Math.floor(Math.random() * bloks) * SQUARE_SIZE
    }
    this.initIntervalFood();
  }

  draw = () => {
    const { snakeContainer, score, direction, bloks, newHighestScore } = this.state;
    const { highestScore } = this.props;
    const snakeContext = this.snakeContainerRef.current.getContext('2d');

    snakeContext.clearRect(0, 0, snakeContainer, snakeContainer);
    this.drawSnake(snakeContext);

    let headX = this.snake[0].x;
    let headY = this.snake[0].y;

    switch(direction) {
      case LEFT_KEY:
        headX -= SQUARE_SIZE;
        break;
      case DOWN_KEY:
        headY += SQUARE_SIZE;
        break;
      case RIGHT_KEY:
        headX += SQUARE_SIZE;
        break;
      default:
        headY -= SQUARE_SIZE;
        break;
    }

    if(headX < 0 || headY < 0 || headX >= bloks * SQUARE_SIZE || headY >= bloks * SQUARE_SIZE) {
      this.changeSnakeDirection(direction, snakeContainer);
    } else {
      let newHead = {
        x: headX,
        y: headY
      }
      if (this.contactsItself(newHead)) {
        this.endGame();
      }
      if (headX === this.food.x && headY === this.food.y) {
        this.growSnake(score, highestScore, bloks);
      } else {
        this.snake.pop();
      }
      this.snake.unshift(newHead);
    }

    snakeContext.fillStyle = newHighestScore ? "#32a852" : "#211818";
    snakeContext.fillText("Score " + score, SQUARE_SIZE * 1, SQUARE_SIZE * 1);
  }

  handleKeyDown = (event) => {
    const { direction } = this.state;
    switch( event.keyCode ) {
      case LEFT_KEY:
        if(this.snake.length === 1 || direction !== RIGHT_KEY) {
          this.setState({
            direction: event.keyCode
          })
        }
        break;
      case UP_KEY:
        if(this.snake.length === 1 || direction !== DOWN_KEY) {
          this.setState({
            direction: event.keyCode
          })
        }
        break;
      case RIGHT_KEY:
        if(this.snake.length === 1 || direction !== LEFT_KEY) {
          this.setState({
            direction: event.keyCode
          })
        }
        break;
      case DOWN_KEY:
        if(this.snake.length === 1 || direction !== UP_KEY) {
          this.setState({
            direction: event.keyCode
          })
        }
        break;
      default:
        break;
    }
  }

  render() {
    const { snakeContainer } = this.state;
    return (
        <canvas
          width={snakeContainer}
          height={snakeContainer}
          className="snake-canvas"
          ref={this.snakeContainerRef}
        />
    );
  }
}

const mapStateToProps = (state, props) => {
  let {
      highestScore
  } = state.score;
  return {
    highestScore
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SnakeCanvas);

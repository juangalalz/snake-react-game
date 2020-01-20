import React, { Component } from 'react';

import './home.scss';
import SnakeCanvas from '../../components/snake-canvas';


class Home extends Component {

  constructor() {
    super();
    this.state = {
      score: 0,
      gameOver: false,
      newHighestScore: false
    }
  }

  componentDidMount() {

  }

  updateScore = (score)  => {
    this.setState({
      score
    })
  }

  updateGameOver = (gameOver)  => {
    this.setState({
      gameOver
    })
  }

  updateNewHighestScore = (newHighestScore)  => {
    this.setState({
      newHighestScore
    })
  }

  restartGame = () => {
    this.setState({
      score: 0,
      gameOver: false,
      newHighestScore: false
    })
    if(this.snakeCanvasCtrl) {
      this.snakeCanvasCtrl.restartGame()
    }
  }

  render() {
    const { gameOver, score, newHighestScore } = this.state;
    return (
      <div className="home">
        <SnakeCanvas
          provideCtrl={ctrl => this.snakeCanvasCtrl = ctrl}
          updateScore={this.updateScore}
          updateGameOver={this.updateGameOver}
          updateNewHighestScore={this.updateNewHighestScore}
          />
        {gameOver && (
          <div className="snake-button-container">
            <div className="card">
              <div className="card_title">
                { newHighestScore && (
                  'New High Score!'
                )}
                { !newHighestScore && (
                  'Game Over'
                )}
              </div>
              <div className="card_description">
                Final Score: {score}
              </div>
              <button
                className="card_button"
                onClick={(e) => {
                  e.preventDefault();
                  this.restartGame();
                }}
                >
                Play again
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;

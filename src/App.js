import React, {Component} from 'react';
import './App.css';
import Card from './card/Card';

const colors = [
    '#f2a989',
    '#a5c3f6',
    '#97db62',
    '#c10000',
    '#102e82',
    '#e45525'
];

function generateCards() {
    const cards = [];
    colors.forEach(color => {
        cards.push({
            color: color,
            matched: false,
            flipped: false
        }, {
            color: color,
            matched: false,
            flipped: false
        });
    });

    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameCards: generateCards(),
            selectedCard: null,
            cardInterval: null,
            gameMoves: +0,
            foundCouples: +0
        };

        this.resetGame = this.resetGame.bind(this);
        this.showCard = this.showCard.bind(this);
    }

    showCard(id) {
        const cards = this.state.gameCards,
            moves = this.state.gameMoves;

        cards[id].flipped = true;
        this.setState({
            gameCards: cards,
            gameMoves: (moves + 1)
        });
        if (this.state.selectedCard) {
            let found = this.state.foundCouples;
            if (this.state.selectedCard.color === cards[id].color) {
                // CARDS MATCH
                this.setMatched(cards[id], cards[this.state.selectedCard.id]);
                found++;
            } else {
                // CARDS UNMATCH
                this.setUnflipped(cards[id], cards[this.state.selectedCard.id]);
            }
            if (this.state.cardInterval) {
                clearInterval(this.state.cardInterval);
                this.setState({
                    cardInterval: null
                });
            }
            this.setState({
                gameCards: cards,
                selectedCard: null,
                foundCouples: found
            });
        } else {
            // SELECT CARD
            const intervalId = setInterval(() => {
                this.unflipCard(id);
            }, 5000);
            this.setState({
                selectedCard: {id: id, color: cards[id].color},
                cardInterval: intervalId
            });
        }
    }

    unflipCard(id) {
        const cards = this.state.gameCards;
        cards[id].flipped = false;
        clearInterval(this.state.cardInterval);
        this.setState({
            gameCards: cards,
            selectedCard: null,
            cardInterval: null
        });
    }

    setMatched(...cards) {
        cards.forEach(card => {
            card.matched = true;
            card.flipped = true;
        });
    }

    setUnflipped(...cards) {
        cards.forEach(card => {
            card.flipped = false;
            card.matched = false;
        });
    }

    gameFinished() {
        return this.state.foundCouples === (this.state.gameCards.length / 2)
    }

    resetGame() {
        this.setState({
            gameCards: generateCards(),
            selectedCard: null,
            cardInterval: null,
            gameMoves: +0,
            foundCouples: +0
        });
    }

    renderCards(cardList) {
        return cardList.map((card, index) => {
            return <Card
                key={index}
                id={index}
                color={card.color}
                matched={card.matched}
                flipped={card.flipped}
                showCard={this.showCard}/>
        });
    }

    render() {
        let finishedMessage;
        if(this.gameFinished()){
            finishedMessage = <h1>Game finished in {this.state.gameMoves} Moves</h1>
        }
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Memory Game</h1>
                    <button type="button" onClick={this.resetGame}>
                        New game
                    </button>
                    {finishedMessage}
                </header>
                <div className="Card-container">
                    {this.renderCards(this.state.gameCards)}
                </div>
            </div>
        );
    }
}

export default App;

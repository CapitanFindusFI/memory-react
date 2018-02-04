import React, {Component} from 'react';
import './Card.css';

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.cardClick = this.cardClick.bind(this);
    }

    cardClick() {
        if (!this.props.flipped) {
            this.props.showCard(this.props.id);
        }
    }

    canShowColor() {
        return this.props.flipped || this.props.disabled;
    }

    render() {
        const cardStyle = {
            cursor: this.props.matched ? 'not-allowed' : 'pointer'
        };
        const innerStyle = {
            background: this.canShowColor() ? this.props.color : 'none'
        };
        return <div className="Card" style={cardStyle} onClick={this.cardClick}>
            <div className="Card-inner">
                <div className="Card-content" style={innerStyle}/>
            </div>
        </div>
    }
}
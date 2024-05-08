import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/FoodCard.css";

function Card({ card }) {
    return (
        <Link to={`/food/${card.id}`} className="food-card"> {/* Navigate to /food/:id */}
            <img src={card.image} alt="food image" width="200" height="200" className="food-image"/>
            <label className="title">{card.title}</label>
            {(card.difficulty==="Easy")?<div className="difficulty-easy">{card.difficulty}</div>:<div className="difficulty">{card.difficulty}</div>}
        </Link>
    );
}

function FoodCard(props) {
    if (props.cardData.length === 0) {
        return (
            <div className="no-result">
                No results to display
            </div>
        );
    } else {
        return (
            <div className="food-section">
                {props.cardData.map((card, index) => (
                    <Card key={index} card={card}/>
                ))}
            </div>
        );
    }
}

export default FoodCard;

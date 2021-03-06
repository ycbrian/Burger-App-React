import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for(let ingredient in props.ingredients){
        ingredients.push(
            {
                name: ingredient,
                amount: props.ingredients[ingredient]
            }  
        );
    }

    const ingreOutput = ingredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display:'inline-block',
                margin:' 5px 8px',
                border: '1px solid #ccc', 
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingreOutput}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
}

export default order;
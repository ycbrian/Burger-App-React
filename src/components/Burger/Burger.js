import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './Burgeringredient/Burgeringredient';

const burger = (props) => {
    let trans_Ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type = {igKey} />
            });
        })
        .reduce((arr,el)=>{
            return arr.concat(el);
        },[]);
        
    if(trans_Ingredients.length===0){
        trans_Ingredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {trans_Ingredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;

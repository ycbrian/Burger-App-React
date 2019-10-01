import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const Ingredient_price = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngre1 = { [action.ingreName]: state.ingredients[action.ingreName] + 1 }
    const updatedIngres1 = updateObject(state.ingredients, updatedIngre1)
    const updatedState1 = {
        ingredients: updatedIngres1,
        totalPrice: state.totalPrice + Ingredient_price[action.ingreName]
    }
    return updateObject(state, updatedState1);
}

const removeIngredient = (state, action) => {
    const updatedIngre2 = { [action.ingreName]: state.ingredients[action.ingreName] - 1 }
    const updatedIngres2 = updateObject(state.ingredients, updatedIngre2)
    const updatedState2 = {
        ingredients: updatedIngres2,
        totalPrice: state.totalPrice - Ingredient_price[action.ingreName]
    }
    return updateObject(state, updatedState2);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    });
}

const fetchIngreFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngreFailed(state, action);
        default: return state;
    }
};

export default reducer;
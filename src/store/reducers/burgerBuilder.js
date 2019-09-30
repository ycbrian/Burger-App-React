import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
};

const Ingredient_price = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingreName]: state.ingredients[action.ingreName] + 1
                },
                totalPrice: state.totalPrice + Ingredient_price[action.ingreName]
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingreName]: state.ingredients[action.ingreName] - 1
                },
                totalPrice: state.totalPrice - Ingredient_price[action.ingreName]
            }
        default:
            return state;
    }
};

export default reducer;
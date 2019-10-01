import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const BurgerSuc = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const BurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const BurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const Burger= (orderData) => {
    return dispatch => {
        dispatch(BurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(BurgerSuc(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(BurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}
import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSum from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler';


const Ingredient_price = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        order: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({error:true});
            })
    }

    updatePurchase(ing) {
        const sum = Object.keys(ing).map(igKey => ing[igKey]).reduce((accu, cur) => accu + cur, 0);
        this.setState({ purchasable: sum > 0 });
    }


    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredient = {
            ...this.state.ingredients
        }
        updateIngredient[type] = updateCount;
        const priceAddition = Ingredient_price[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updateIngredient });
        this.updatePurchase(updateIngredient);
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        const updateCount = oldCount - 1;
        const updateIngredient = {
            ...this.state.ingredients
        }
        updateIngredient[type] = updateCount;
        const priceDeduction = Ingredient_price[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updateIngredient });
        this.updatePurchase(updateIngredient);
    }

    orderHandle = () => {
        this.setState({ order: true });
    }

    orderCancel = () => {
        this.setState({ order: false });
    }

    orderContinue = () => {
       
        const query = [];
        for(let i in this.state.ingredients){
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        query.push('price=' + this.state.totalPrice.toFixed(2));
        const queryString = query.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disInfo = {
            ...this.state.ingredients
        };
        for (let key in disInfo) {
            disInfo[key] = disInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingAdd={this.addIngredient}
                        ingRem={this.removeIngredient}
                        disable={disInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.orderHandle}
                        price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSum
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                orderCancel={this.orderCancel}
                orderContinue={this.orderContinue} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }


        return (
            <Aux>
                <Modal show={this.state.order} modalClosed={this.orderCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withError(BurgerBuilder, axios);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSum from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerActions from '../../store/actions/index';




export class BurgerBuilder extends Component {

    state = {
        order: false
    }

    componentDidMount() {
        this.props.InitIngre();
    }

    updatePurchase(ing) {
        const sum = Object.keys(ing).map(igKey => ing[igKey]).reduce((accu, cur) => accu + cur, 0);
        return sum > 0;
    }


    orderHandle = () => {
        if(this.props.isAuthenticated) this.setState({ order: true });
        else{
            this.props.SetAuthRedirPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    orderCancel = () => {
        this.setState({ order: false });
    }

    orderContinue = () => {
        this.props.InitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disInfo = {
            ...this.props.ings
        };
        for (let key in disInfo) {
            disInfo[key] = disInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingAdd={this.props.AddIngre}
                        ingRem={this.props.RemoveIngre}
                        disable={disInfo}
                        purchasable={this.updatePurchase(this.props.ings)}
                        ordered={this.orderHandle}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSum
                ingredients={this.props.ings}
                price={this.props.price}
                orderCancel={this.orderCancel}
                orderContinue={this.orderContinue} />;
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AddIngre: (ingname) => dispatch(burgerActions.addIngredient(ingname)),
        RemoveIngre: (ingname) => dispatch(burgerActions.removeIngredient(ingname)),
        InitIngre: () => dispatch(burgerActions.initIngredients()),
        InitPurchase: () => dispatch(burgerActions.purchaseInit()),
        SetAuthRedirPath: (path) => dispatch(burgerActions.AuthRedirPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(BurgerBuilder, axios));
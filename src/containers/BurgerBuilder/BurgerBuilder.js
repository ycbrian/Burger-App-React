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
import * as actionTypes from '../../store/actions';




class BurgerBuilder extends Component {

    state = {
        order: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({error:true});
        //     })
    }

    updatePurchase(ing) {
        const sum = Object.keys(ing).map(igKey => ing[igKey]).reduce((accu, cur) => accu + cur, 0);
        return sum > 0;
    }


    orderHandle = () => {
        this.setState({ order: true });
    }

    orderCancel = () => {
        this.setState({ order: false });
    }

    orderContinue = () => {
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

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

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
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSum
                ingredients={this.props.ings}
                price={this.props.price}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AddIngre: (ingname) => dispatch({ type: actionTypes.ADD_INGREDIENTS, ingreName: ingname }),
        RemoveIngre: (ingname) => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingreName: ingname })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(BurgerBuilder, axios));
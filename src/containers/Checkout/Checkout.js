import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 0
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (!state.ingredients) {
            const query = new URLSearchParams(props.location.search);
            // console.log(query);
            const ingredients = {};
            let price = 0;
            for (let [u, v] of query.entries()) {
                if (u === 'price') {
                    price = v;
                } else {
                    ingredients[u] = Number(v);
                }
            }
            // console.log(ingredients);
            return {
                ingredients: ingredients,
                totalPrice: price
            }
        }
        return null;
        
        // this.setState({ ingredients: ingredients, totalPrice: price });
    }

    checkCancel = () => {
        this.props.history.goBack();
    }

    checkConti = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkCancel={this.checkCancel}
                    checkConti={this.checkConti} />
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} />
            </div>
        );
    }
}

export default Checkout;
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    checkCancel = () => {
        this.props.history.goBack();
    }

    checkConti = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = < Redirect to='/' />
        if (this.props.ings) {
            const purRedir = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purRedir}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkCancel={this.checkCancel}
                        checkConti={this.checkConti} />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);
import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const orderSummary = Object.keys(props.ingredients)
    .map(igKey=>{
        return(
            <li key={igKey}><strong><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</strong></li>
        )
    })
return (
    <Aux>
        <h3>Your Order Summary</h3>
        <p>Your delicious order has following ingredients: </p>
        <ul>
        {orderSummary}
        </ul>
    </Aux>
)
}
export default orderSummary;
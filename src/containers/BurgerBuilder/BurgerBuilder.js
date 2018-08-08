import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.4,
    meat: 1.3,
    bacon: 0.8,
    cheese: 0.5
}
class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad : 0,
            cheese : 0,
            bacon : 0,
            meat : 0
        },
        totalPrice : 3
    }

    addIngredient = (type)=> {
        const oldIngredientCount = this.state.ingredients[type];
        const newIngredientCount = oldIngredientCount + 1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = newIngredientCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients :updatedIngredient,
            totalPrice: newPrice
        })

    }
    render() {
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientsAdded={this.addIngredient}/>
            </Aux>
        )
    }
}
export default BurgerBuilder;
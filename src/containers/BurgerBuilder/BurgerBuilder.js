import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.4,
    meat: 1.3,
    bacon: 0.8,
    cheese: 0.5
}
class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            ingredients : {
                salad : 0,
                cheese : 0,
                bacon : 0,
                meat : 0
            },
            totalPrice : 3,
            purchasable: false,
            purchasing: false
        }
    
        this.purchaseHandler = this.purchaseHandler.bind(this);
    }
 

    updatePurchasable (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        })
        .reduce((sum,el)=>{
        return sum+el;
        },0)
        this.setState({purchasable: sum >0})
    }

    addIngredient = (type)=> {
        const oldIngredientCount = this.state.ingredients[type];
        const newIngredientCount = oldIngredientCount + 1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = newIngredientCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice =    this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients :updatedIngredient,
            totalPrice: newPrice
        })
        this.updatePurchasable(updatedIngredient)

    }

    removeIngredient = (type)=> {
        const oldIngredientCount = this.state.ingredients[type];
        if(oldIngredientCount <= 0){
            return;
        }
        const newIngredientCount = oldIngredientCount - 1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = newIngredientCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice =    this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients :updatedIngredient,
            totalPrice: newPrice
        })
        this.updatePurchasable(updatedIngredient)
    }
    purchaseHandler () {
        this.setState({purchasing:true});
        console.log("purchasing", this.state.purchasing)
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                {this.state.purchasing ? <Modal>
                <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>: null}
                <BuildControls 
                ingredientsAdded={this.addIngredient}
                ingredientRemoved={this.removeIngredient}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler}/>
            </Aux>
        )
    }

}
export default BurgerBuilder;
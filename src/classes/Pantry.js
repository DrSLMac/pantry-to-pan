class Pantry {
  constructor(user) {
    // this.allIngredients = user.ingredientsDataSet;
    this.ingredientsOwned = user.pantry;
    this.ingredientsToBuy = [];
  }

  checkForIngredients(ingredients) {
    //Ingredients is the recipe we are making ingredient array
    const ingToBuy = ingredients.reduce((acc, ingredient) => {
      let matching = this.ingredientsOwned.find((ingredientOwned) => {
        return ingredientOwned.ingredient === ingredient.id;
      });
      //Checks to see if there is a matching ingredient in the use pantry^
      if (!matching) {
        // If there is no match, add to our ingredients to buy array^
        acc.push(ingredient.id);
      } else if (matching.amount < ingredient.quantity.amount) {
        // If there is a match, but don't have an ingredient in the pantry, also add.
        acc.push(ingredient.id);
      }
      return acc;
    }, []);
    return ingToBuy;
  }

  //   returnAllAvailableIngredients(ingredients) {
  //     console.log("ingredients : ", ingredients);
  //     console.log("this.allIngredients : ", this.allIngredients);
  //   }

  //   addIngredientsToPantry() {
  //     console.log(this.allIngredients);
  //   }

  //   addIngredient(ingredientID, ingredientModification) {
  //     let ingredient = this.ingredients.find((ingredient) => {
  //       return ingredient.id === ingredientID;
  //     });
  //     if (ingredient) {
  //       let have = ingredient.amount;
  //       let add = ingredientModification;
  //       ingredient.updateAmount(have + add);
  //     }
  //     if (!ingredient) {
  //       this.addIngredientObjects(ingredientObject);
  //     }
  //   }
}

export default Pantry;

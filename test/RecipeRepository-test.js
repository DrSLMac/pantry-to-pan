import { expect } from "chai";
import RecipeRepository from "../src/classes/RecipeRepository";
//import Recipe from "../src/classes/Recipe";

describe("RecipeRepository", () => {
  let recipeData; //recipe.js
  let recipeRepository;
  //let newRecipe;

  beforeEach(function () {
    recipeData = [
      {
        id: 595736,
        image: "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        ingredients: [
          {
            id: 20081,
            quantity: {
              amount: 1.5,
              unit: "c",
            },
          },
          {
            id: 18372,
            quantity: {
              amount: 0.5,
              unit: "tsp",
            },
          },
          {
            id: 1123,
            quantity: {
              amount: 1,
              unit: "large",
            },
          },
        ],
        instructions: [
          {
            instruction:
              "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
            number: 1,
          },
          {
            instruction: "Add egg and vanilla and mix until combined.",
            number: 2,
          },
          {
            instruction:
              "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
            number: 3,
          },
        ],
        name: "Loaded Chocolate Chip Pudding Cookie Cups",
        tags: ["antipasti", "starter", "snack"],
      },
      {
        id: 412309,
        image: "https://spoonacular.com/recipeImages/412309-556x370.jpeg",
        ingredients: [
          {
            id: 1002030,
            quantity: {
              amount: 4,
              unit: "teaspoons",
            },
          },
          {
            id: 19334,
            quantity: {
              amount: 8,
              unit: "tablespoons",
            },
          },
          {
            id: 1001,
            quantity: {
              amount: 2,
              unit: "cups",
            },
          },
        ],
        instructions: [
          {
            instruction:
              "Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.",
            number: 1,
          },
        ],
        name: "Dirty Steve's Original Wing Sauce",
        tags: ["sauce"],
      },
    ];

    recipeRepository = new RecipeRepository(recipeData);
    // newRecipe = new Recipe();
  });

  it("Should be a function", () => {
    expect(RecipeRepository).to.be.a("function");
  });

  it("Should instantiate an instance of RecipeRepository", () => {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

  it("Should take in recipe data", () => {
    expect(recipeRepository.recipes).to.equal(recipeData);
  });

  it("Should be able to filter by tag", () => {
    expect(recipeRepository.filterTag("sauce")).to.deep.equal([
      [recipeData[1]],
    ]);
  });

  it("Should be able to filter by name", () => {
    expect(
      recipeRepository.filterName("Loaded Chocolate Chip Pudding Cookie Cups")
    ).to.deep.equal(recipeData[0]);
  });
});

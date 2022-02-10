import {child, getDatabase, ref, set, push} from "firebase/database";

export const CreateRecipe = () => {
  const createRecipeHandler = () => {
    writeUserData();
  }
  const writeUserData = () => {
    const db = getDatabase();
    const recipeId = push(child(ref(db), 'recipes/')).key;
    set(ref(db, 'recipes/' + recipeId), {
      id: recipeId,
      title: 'title',
      description: 'description',
      owner: 'owner',
      date: Date.now(),
      duration: 50,
      diameter: 20,
      imgUrl: '#',
      tags: ['tag1', 'tag2', 'tag3'],
      ingredients: [{name: 'ingredients name1', unit: 'g', count: 150}, {name: 'ingredients name2', unit: 'g', count: 30}],
      recipeText: `Recipe text`
    })
      .then((result) => {
        console.log(result, 'success!')
      })
  }
  return (
      <button type="button" onClick={createRecipeHandler}>Create Recipe</button>
  )
}
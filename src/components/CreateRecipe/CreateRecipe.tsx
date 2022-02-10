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
      duration: { count: 50, unit: 'unit'},
      diameter: 20,
      imgUrl: '#',
      tags: ['tag1', 'tag2', 'tag3'],
      ingredients: [{name: 'ingredients name1', unit: 'g'}, {name: 'ingredients name2', unit: 'g'}],
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
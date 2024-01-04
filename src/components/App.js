import "../css/App.css";
import { authProvider } from "../helpers/authProvider";
import axiosInstance from "../helpers/axiosInstance";
import { useState } from "react";

import { useNavigate, useRouteLoaderData } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [recipeName, setRecipe] = useState("");
  const [recipeID, setrecipeID] = useState("");
  const [recipeList, setRecipeList] = useState([]);

  async function handleSetRecipe() {
    const response = await axiosInstance.post("recipe/setRecipe", null, {
      params: {
        recipeName: recipeName,
        recipeID: recipeID == "" ? recipeName : recipeID,
      },
    });

    if (response.data.success) {
      setrecipeID("");
      setRecipe("");
      await getRecipe();
    } else {
      alert(response.data.message);
    }
  }

  async function getRecipe() {
    let response = {};
    try {
      response = await axiosInstance.get("/recipe");
      setRecipeList(response.data);
    } catch (error) {
      if (error.response.status === 500 || error.response.status === 401) {
        await authProvider.logout();
        navigate("/");
      }
      alert(error.response.statusText);
    }
  }

  function handleRecipeNameChange(e) {
    setRecipe(e.target.value);
  }
  async function handleSignOut() {
    const response = await authProvider.logout();

    if (response.data.success) {
      navigate("/");
    } else {
      alert(response.data.message);
    }
  }

  return (
    <div className="App">
      <p>Hi! {authProvider.userName}</p>
      <button onClick={() => getRecipe()}>Get Travel</button>
      {recipeList &&
        recipeList.map((recipe) => {
          return (
            <li
              key={recipe.Name}
              onClick={() => {
                setRecipe(recipe.Name);
                setrecipeID(recipe.Name);
              }}
            >
              {recipe.Name}
            </li>
          );
        })}
      <div>
        <h4>Create Recipe</h4>
        <input
          type="text"
          onChange={(e) => handleRecipeNameChange(e)}
          value={recipeName}
        ></input>
        <button onClick={() => handleSetRecipe()}>Set Recipe</button>
      </div>
      <div>
        <button onClick={() => handleSignOut()}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;

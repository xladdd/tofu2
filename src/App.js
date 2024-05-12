import "./App.css";
import { useEffect, useState } from "react";
import { app } from "./firebase.js";
import { Header } from "./components/header";
import { Recipe } from "./components/recipe";
import { Footer } from "./components/footer";

function App() {
  const [scrollData, setScrollData] = useState();
  const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let [recipeNo, setRecipeNo] = useState();

  // Function to handle recipe click event
  const handleRecipeClick = (recipeId) => {
    // Find the index of the clicked recipe in the recipeData array
    const index = recipeData.findIndex((recipe) => recipe.id === recipeId);
    // Update the recipeNo state variable with the index
    setRecipeNo(index);
  };

  useEffect(() => {
    // Call the function to fetch data from the database
    const fetchScrollData = async () => {
      // Function to fetch data from the Firebase Realtime Database
      try {
        // Construct the URL to your Firebase Realtime Database
        const databaseURL = `${app.options.databaseURL}/scroll.json`;

        // Make a fetch request to the database URL
        const response = await fetch(databaseURL);

        // Parse the JSON response
        const data = await response.json();

        // Do something with the data
        setScrollData(data);
        console.log(scrollData);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error(
          "Error fetching scroll data from Firebase Realtime Database:",
          error
        );
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading state to false even if there's an error
      }
    };
    const fetchRecipeData = async () => {
      // Function to fetch data from the Firebase Realtime Database
      try {
        const databaseURL = `${app.options.databaseURL}/recipes.json`;
        const response = await fetch(databaseURL);
        const data = await response.json();

        console.log("Data before conversion:", data);

        // Convert the object to an array of objects
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        // Set the fetched data as state
        setRecipeData(dataArray);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error(
          "Error fetching scroll data from Firebase Realtime Database:",
          error
        );
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading state to false even if there's an error
      }
    };
    fetchRecipeData();
    fetchScrollData();
  }, [scrollData]); // Ensure this effect runs only once on component mount

  // Handle loading state
  if (loading) {
    return <h1>Dyť už jdu...</h1>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="app">
      <div className="gradient-background"></div>
      {loading === true ? (
        <h2 style={{ fontSize: "50px", textAlign: "center" }}>
          Loading...
        </h2>
      ) : (
        <p></p>
      )}
      {scrollData && (
        <Header
          scrollData={scrollData}
          recipeData={recipeData}
          onRecipeClick={handleRecipeClick}
        />
      )}
      {recipeData && <Recipe recipeData={recipeData} recipeNo={recipeNo} />}
      <Footer />
    </div>
  );
}

export default App;

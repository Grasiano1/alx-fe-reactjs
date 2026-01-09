import React, { useState, useEffect } from 'react';
import recipeData from '../data.json'; // Adjust the path based on your file structure

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Simulating a data fetch by setting the imported JSON to state
        setRecipes(recipeData);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Our Recipes</h1>

            {/* Step 4: Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card-container">
                        {/* Step 3: Recipe Card Component */}
                        <RecipeCard recipe={recipe} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;

const RecipeCard = ({ recipe }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
            {/* Recipe Image */}
            <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
            />

            {/* Recipe Content */}
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">
                    {recipe.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                    {recipe.summary}
                </p>

                <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    View Recipe
                </button>
            </div>
        </div>
    );
};
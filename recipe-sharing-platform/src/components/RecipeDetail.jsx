import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    

    useEffect(() => {
        // Find the specific recipe by ID
        const foundRecipe = recipeData.find((r) => r.id === Number(id));
        setRecipe(foundRecipe);
    }, [id]);

    if (!recipe) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            {/* Navigation Button */}
            <button
                onClick={() => navigate('/')}
                className="mb-6 text-orange-600 font-semibold hover:underline flex items-center"
            >
                ← Back to Recipes
            </button>

            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-64 md:h-96 object-cover"
                />

                <div className="p-6 md:p-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        {recipe.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Ingredients Column */}
                        <div className="md:col-span-1">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                                Ingredients
                            </h2>
                            <ul className="space-y-3">
                                {recipe.ingredients.map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-700">
                                        <span className="text-orange-500 mr-2">•</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructions Column */}
                        <div className="md:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                                Instructions
                            </h2>
                            <ol className="space-y-6">
                                {recipe.instructions.map((step, index) => (
                                    <li key={index} className="flex">
                                        <span className="font-bold text-orange-600 mr-4 text-xl">
                                            {index + 1}.
                                        </span>
                                        <p className="text-gray-700 leading-relaxed">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!title.trim()) newErrors.title = "Recipe title is required.";
    
    // Split ingredients by lines or commas and check for at least 2
    const ingredientList = ingredients.split(/[,\n]/).filter(item => item.trim() !== "");
    if (ingredientList.length < 2) {
      newErrors.ingredients = "Please provide at least two ingredients.";
    }

    if (!steps.trim()) newErrors.steps = "Preparation steps are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newRecipe = {
        id: Date.now(), // Unique ID for our new recipe
        title,
        ingredients: ingredients.split(/[,\n]/).map(i => i.trim()),
        steps,
      };
      console.log("New Recipe Submitted:", newRecipe);
      alert("Recipe added successfully!");
      // Reset form
      setTitle('');
      setIngredients('');
      setSteps('');
      setErrors({});
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add a New Recipe</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Recipe Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-orange-200'}`}
            placeholder="e.g., Grandma's Famous Pasta"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Ingredients Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Ingredients (Separate by commas or new lines)</label>
          <textarea
            rows="4"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.ingredients ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-orange-200'}`}
            placeholder="Tomato, Garlic, Basil..."
          ></textarea>
          {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients}</p>}
        </div>

        {/* Steps Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Preparation Steps</label>
          <textarea
            rows="6"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.steps ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-orange-200'}`}
            placeholder="1. Boil water... 2. Add salt..."
          ></textarea>
          {errors.steps && <p className="text-red-500 text-xs mt-1">{errors.steps}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-600 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
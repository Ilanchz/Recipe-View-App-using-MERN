import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Food.css'; // Import CSS file for Food component

function Food() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fav,setFav]=useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:5000/getRecipeDetails/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe details');
                }
                const data = await response.json();
                setRecipe(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipe:', error);
                setError(error.message || 'Failed to fetch recipe details');
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleSaveFavorite = async () => {
        try {
            const response = await fetch('http://localhost:5000/saveFavorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: recipe.id }),
            });

            if (!response.ok) {
                setFav(true);
                throw new Error('Failed to save favorite');
                
            }

            console.log('Recipe saved to favorites!');
            setFav(true);
        } catch (error) {
            console.error('Error saving favorite:', error);
            console.log('Failed to save favorite');
        }
    };

    return (
        <div className="food-container">

            {(recipe && fav ) && (
                <div className="favorite-button" onClick={handleSaveFavorite}>
                    Added ✅
                </div>
            )}

            {(recipe && !fav ) && (
                <div className="favorite-button" onClick={handleSaveFavorite}>
                    Save as Favorite
                </div>
            )}

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : recipe ? (
                <div className="food-content">
                    <div className="food-image">
                        <img src={recipe.image} alt={recipe.title} />
                    </div>
                    <div className="food-details">
                        <h2>{recipe.title}</h2>
                        <p className="description">{recipe.description}</p>
                        <div className="info">
                            <p>Difficulty: {recipe.difficulty}</p>
                            <p>Portion: {recipe.portion}</p>
                            <p>Time: {recipe.time}</p>
                        </div>
                        <h3>Ingredients:</h3>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <h3>Method:</h3>
                        <ol>
                            {recipe.method.map((step, index) => (
                                <li key={index}>{Object.values(step)[0]}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            ) : (
                <div>Recipe not found</div>
            )}
            
        </div>
    );
}

export default Food;

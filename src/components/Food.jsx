import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Food.css'; // Import CSS file for Food component

function Food() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

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

    const handleToggleFavorite = async () => {
        try {
            const endpoint = isFavorite ? 'removeFavorite' : 'saveFavorite';
            const response = await fetch(`http://localhost:5000/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: recipe.id }),
            });

            if (!response.ok) {
                setIsFavorite(!isFavorite);
                throw new Error('Failed to toggle favorite');
                
            }

            setIsFavorite(!isFavorite);
            console.log('Favorite toggled successfully');
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return (
        <div className="food-container">

            <div className="favorite-button" onClick={handleToggleFavorite}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : recipe ? (
                <div>

                <div className="food-content">
                    <div className="food-image">
                        <img src={recipe.image} alt={recipe.title} />
                    </div>
                    <div className="food-details">
                        <h2 className='method-title'>{recipe.title}</h2>
                        <p className="description">{recipe.description}</p>
                        <div className="info">
                            <p>Difficulty: {recipe.difficulty}</p>
                            <p>Portion: {recipe.portion}</p>
                            <p>Time: {recipe.time}</p>
                        </div>
                        <h3 className='method-title'>Ingredients</h3>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    
                    
                </div>

                <div className='method-div'>
                    <h3 className='method-title'>Method</h3>
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

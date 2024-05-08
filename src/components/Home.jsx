import '../styles/Home.css';
import SearchPanel from './SearchPanel';
import FoodCard from './FoodCard';
import { useState,useEffect } from 'react';

function Home() {

  const [search,SetSearch]=useState('');

  const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:5000/getAllRecipes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ s: "" })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCardData(data);
                console.log("Fetched all recipes!");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRecipes();
    }, []);

  return (
    <div>
      <SearchPanel search={search} SetSearch={SetSearch} cardData={cardData} setCardData={setCardData}/>
      <FoodCard cardData={cardData}/>
    </div>
  );
}

export default Home;

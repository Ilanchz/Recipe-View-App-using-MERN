import "../styles/Search.css";

function SearchPanel(props){

    async function triggerSearch(){
        console.log("button clicked!");

        try {
            const response = await fetch('http://localhost:5000/getAllRecipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ s: props.search })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            props.setCardData(data);
            console.log("Fetched all recipes!");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function fetchFavorites(){
        try {
            const response = await fetch('http://localhost:5000/getFavorites');
            if (!response.ok) {
                throw new Error('Failed to fetch favorites');
            }
            const data = await response.json();
            console.log(data);
            // Filter card data based on favorite IDs
            const filteredData = props.cardData.filter(card => data.includes(card.id));
            console.log(filteredData);
            props.setCardData(filteredData);
            console.log("Filtered recipes based on favorites!");
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    }

    function typeSearch(event){
        props.SetSearch(event.target.value);
        console.log(event.target.value);
    }

    return (
        <div className="search-container">
            <input placeholder="Search your food here..." value={props.search} onChange={typeSearch} className="search-bar" />
            <button onClick={triggerSearch} className="search-button">Search</button>
            <button onClick={fetchFavorites} className="fav-button">Fav ❤</button>
        </div>
    );
}

export default SearchPanel;

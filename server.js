const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); // Import ObjectId from mongodb
const cors = require('cors');
const bodyParser = require('body-parser');

const uri = "mongodb://localhost:27017";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

async function Connect() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('recipe');
        return { db, client }; 
    } catch (error) {
        console.log("Encountered Error: ", error);
        throw error; 
    }
}

app.post("/getAllRecipes", async (req, res) => {
    console.log("Received Request");
    console.log(req.body);
    const search = req.body.s;
    console.log(search);

    let client;

    try {
        const { db, client: _client } = await Connect();
        client = _client; 

        const collection = db.collection('all');

        let result;
        if (search === "") {
            result = await collection.find({}).toArray();
        } else {
            result = await collection.find({ title: { $regex: search, $options: 'i' } }).toArray();
        }
        
        res.status(200).send(result);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.close();
        }
    }
});

app.get("/getRecipeDetails/:id", async (req, res) => {
    const { id } = req.params;

    let client;

    try {
        const { db, client: _client } = await Connect();
        client = _client;

        const collection = db.collection('details');

        const result = await collection.findOne({ id: id });
        if (!result) {
            res.status(404).send("Recipe not found");
            return;
        }

        res.status(200).send(result);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.close();
        }
    }
});

app.post("/saveFavorite", async (req, res) => {
    const { id } = req.body;

    let client;

    try {
        const { db, client: _client } = await Connect();
        client = _client;

        const collection = db.collection('favorites');

        // Check if the recipe already exists in favorites
        const existingRecipe = await collection.findOne({ id: id });
        if (existingRecipe) {
            res.status(400).send("Recipe already exists in favorites");
            return;
        }

        // Insert the recipe into favorites collection
        await collection.insertOne({ id: id });

        res.status(200).send("Recipe saved to favorites");
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.close();
        }
    }
});

app.get("/getFavorites", async (req, res) => {
    let client;

    try {
        const { db, client: _client } = await Connect();
        client = _client;

        const collection = db.collection('favorites');

        // Assuming each favorite document has a field 'recipeId' which contains the ID of the recipe
        const favorites = await collection.find({}).toArray();
        console.log(favorites);
        // Extracting recipe IDs from favorites
        const favoriteIds = favorites.map(fav => fav.id);

        res.status(200).send(favoriteIds);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.close();
        }
    }
});

// Assuming you have already initialized your MongoDB client and connected to the database

app.post("/removeFavorite", async (req, res) => {
    const { id } = req.body;

    let client;

    try {
        const { db, client: _client } = await Connect();
        client = _client;

        const collection = db.collection('favorites');

        // Remove the favorite with the given recipe ID
        const result = await collection.deleteOne({ id: id });

        if (result.deletedCount === 0) {
            res.status(404).send("Favorite not found");
            return;
        }

        res.status(200).send("Favorite removed successfully");
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.close();
        }
    }
});


app.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}`);
});

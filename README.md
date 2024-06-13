Recipe App Readme

Overview:
This Recipe App is a web application built using React for the frontend, regular CSS for styling, and MongoDB for the database. It allows users to browse, search, and save their favorite recipes. Additionally, it includes an API Extractor folder which extracts recipe data from external APIs for expanding the recipe database.

Features:
Browse Recipes: Users can browse through a wide variety of recipes available in the database.

Search Functionality: The app provides a search bar to easily find recipes by name, ingredients, or categories.

Save Favorites: Users can save their favorite recipes for quick access later.

API Extractor: The API Extractor folder contains scripts to extract recipe data from external APIs, enriching the app's recipe database.

Tech Stack:
Frontend: React
Styling: Regular CSS
Backend: MongoDB
API Extractor: JavaScript
Installation:
Clone the repository:

bash
Copy code
git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd recipe-app
Install dependencies:

Copy code
npm install
Start the development server:

sql
Copy code
npm start
Access the app in your browser at http://localhost:3000.

File Structure:
src/
components/: Contains React components for the UI.
styles/: Contains CSS files for styling.
utils/: Contains utility functions.
App.js: Main component.
index.js: Entry point of the application.
APIExtractor/
extractor.js: Script to extract data from external APIs.
config.js: Configuration file for API keys and endpoints.
API Extractor:
The API Extractor folder contains scripts to fetch recipe data from external sources like Spoonacular, Food2Fork, etc. Follow the steps below to use the extractor:

Add your API keys and endpoints to the config.js file.
Run the extractor script (extractor.js) to fetch recipe data from the specified APIs.
The extracted data will be saved to the MongoDB database, enriching the app's recipe collection.

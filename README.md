# Star Wars Character App

This is a simple React application that fetches Star Wars characters data from the SWAPI API. It provides various features including pagination, search functionality, sorting, filtering, and user authentication using JWT.

## Features

- Display a list of Star Wars characters fetched from the SWAPI API.
- Pagination: Navigate through multiple pages of characters.
- Search Functionality: Search for characters by name, with partial or complete matches.
- Sorting: Sort characters by name in ascending or descending order.
- Filtering: Filter characters by homeworld, film, or species.
- User Authentication: Authenticate users using JWT with a UI for logging in and out.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/khuranajordan/r-swapi-test
   ```
2. Navigate to the project directory
    ```bash
    cd r-swapi-test
    ```
3. Install the dependencies
    ```bash
    npm install
    ```
4. Start the development server
    ```
    npm run dev
    ```
5. Access the application on port **5173**.

## Usage
- Upon accessing the application, users will be redirected to the login page.
- Use the provided UI to log in with a fake username and password. -Upon successful authentication, users will be redirected to the main page displaying Star Wars characters.
- Navigate through the pages of characters using the pagination controls.
- Use the search input to search for characters by name.
- Click on the "Sort by Name" button to toggle between ascending and descending order of character names.
- Use the filter options to filter characters by homeworld, film, or species.

### Dummy Login Credentials
- Dummy Username: 'kminchelle'
- Dummy Password: '0lelplR'

## Technologies Used
- React
- SWAPI API
- Chakra UI (for UI components)
- React Router (for routing)
- JWT (for user authentication)

## Credits
- The SWAPI API for providing Star Wars characters data.
- Chakra UI for providing accessible and customizable UI components.
- React Router for handling routing within the application.
- JSON Web Tokens (JWT) for implementing user authentication.
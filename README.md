# Art-Nova-Marketplace

A decentralized NFT marketplace built with React, Seaport, PostgreSQL, Sequelize, and Metamask integration.

## Description

This project is a decentralized marketplace for buying and selling Non-Fungible Tokens (NFTs) similar to OpenSea. It allows users to connect their Metamask wallet, browse and discover NFTs, create listings, and make purchases using cryptocurrency.

## Features

- Metamask integration for wallet connectivity
- Browse and search NFT listings
- Create and manage NFT listings
- Buy and sell NFTs securely
- Ethereum blockchain integration

## Technologies Used

- React
- Seaport
- PostgreSQL
- Sequelize
- Metamask

## Prerequisites

To run this project locally, ensure you have the following installed:

- Node.js
- PostgreSQL

## Getting Started

1. Clone the repository:
```
git clone https://github.com/Vedant-Soni/Art-Nova-Marketplace.git
```

2. Install the backend dependencies:
```
cd Art-Nova-Marketplace/backend
npm install
```

3. Set up the PostgreSQL database:

- Create a new PostgreSQL database.
- Update the database configuration in `config/database.js` with your database credentials.

4. Migrate the database:
```
npx sequelize-cli db:migrate
```
5. Start the backend server:
```
nodemon index.js
```

7. Install the frontend dependencies:
```
cd Art-Nova-Marketplace/frontend
npm install
```
8. Start the frontend project:
```
npm start
```

9. Open your browser and navigate to `http://localhost:{Your_port}` to view the app.

## Screenshots
![alt text](https://github.com/Vedant-Soni/Art-Nova-Marketplace/blob/main/Screenshot/Screenshot%20from%202023-06-29%2014-33-37.png)
![alt text](https://github.com/Vedant-Soni/Art-Nova-Marketplace/blob/main/Screenshot/Screenshot%20from%202023-06-29%2014-33-56.png)
![alt text](https://github.com/Vedant-Soni/Art-Nova-Marketplace/blob/main/Screenshot/Screenshot%20from%202023-06-29%2014-34-56.png)
![alt text](https://github.com/Vedant-Soni/Art-Nova-Marketplace/blob/main/Screenshot/Screenshot%20from%202023-06-29%2014-35-18.png)
![alt text](https://github.com/Vedant-Soni/Art-Nova-Marketplace/blob/main/Screenshot/Screenshot%20from%202023-06-29%2014-35-28.png)


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).


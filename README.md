# Boardcamp

A system to manage a board game rental store using SQL

## Features

- List categories - **GET** `/categories`
- Insert category - **POST** `/categories`
- List games - **GET** `/games`
- Insert game - **POST** `/games`
- List clients - **GET** `/customers`
- Insert client - **POST** `/customers`
- Get client by id - **GET** `/customers/:id`
- Update client - **PUT** `/customers/:id`
- List rentals - **GET** `/rentals`
- Insert rental - **POST** `/rentals`
- Finish rental - **POST** `/rentals/:id/return`
- Delete rental - **DELETE** `/rentals/:id`

## Technologies

<div align="center">
	<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" >
	<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" >
	<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" >
	<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" >
	<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" >
	<img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" >
</div>

## How to run

1. Clone this repository
```bash
git clone https://github.com/kethlynsara/Boardcamp.git
```
2. Install dependencies
```bash
npm i
```
3. Create database
```bash
bash ./create-database
```
4. Connect to database: add DATABASE_URL and PORT on the file `.env`

5. Run the application
```bash
node index.js
```
6. Deploy with `heroku`

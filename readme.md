#### Project Setup

1. clone the repository
2. cd into the folder and npm install or yarn
3. Copy .env from .env.example
4. You have to fill enviroment variables in the .env file such as port and database credentials
5. You need to create a database in your mysql server with the name you gave in .env
6. `yarn dev or npm run dev` to start the project
7. You will see success message of server runnning and the port (eg. "Application is running :) 3200")

#### Data Seeding

After you project runs successfully, you need to seed proudct data into your database.

`yarn seed_product or npm run seed_product `

This command will insert dummy product data into your mysql database.

#### API Documentation

##### Products

1. Get All Products
   `/api/products `

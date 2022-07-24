#### Demo Version

##### Frontend

`http://invoicing.54827095-98-20211103124321.webstarterz.com/invoices `

##### Api

`http://150.95.31.137:3200/api/ `

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

1. ##### Get All Products
   GET -> `/api/products `
2. ##### Get Product by keyword search
   GET -> `/api/products?search=Piza`

#### Invoice

1. ##### Get All Invoice

   GET -> `/api/invoices `

   For pagination you need to provide page as a query. If there is no page query, default will be page 1.
   GET -> `/api/invoices?page=2`

2. ##### Save Invoice

   POST -> `/api/invoices `

   ###### Sample Request Body

   json

   ```
   {
    "customer_name":"a",
    "sale_person":"b",
    "total":10000,
    "note":"ABC",
    "product_ids":
      [
         {
            "id":1,
            "price":1000,
            "amount":2
         },
         {
            "id":2,
            "price":1000,
            "amount":2
         }
      ]
   }

   ```

3. ##### Get Each Invoice

   GET -> `/api/invoice/1 `

4. ##### Get Chart Data for Invoice
   GET -> `/api/invoice-graph`


Step 1: Create CRUD API : react-pagination
https://bezkoder.com/node-js-express-sequelize-mysql/
Step 1.5:
https://bezkoder.com/node-js-sequelize-pagination-mysql/

Step 2: Nodejs Server side app : react-pagination-server


Step 3: Reactjs Client side app : react-pagination-client



Descriptions:
______________
Step 1:

- Create node.js app and intialize using npm init
- npm install express sequelize mysql2 body-parser cors --save
- Check dependecies in package.json file 
- Create app folder in root folder
- Setup Express Web Server: server.js file in root folder
    - Import express, body-parser, and cors modules
    - Express: for building Rest APIs
    - Body-parser: to parse the request and create the req.body object
    - Cors: provides express middleware to enable CORS with various options
    - test on http://localhost:8080
- Configure MySQL database & Sequelize:
    - in app folder, create separate config folder for configs files
    - db.config.js file with optional pool parameter 
- Initialize Sequelize:
    - create app/models folder and index.js file in it
    - add sync() in server.js for that db connection (Do not use it. Follow comments in code.)
- Define the Sequelize Model:
    - create records.models.js file in models folder
    - It contains table structure and names of columns
    - sequelize already convers all the CRUD functions.
        - create(object) findByPk(id) findAll() update(data, where:{id:id}) 
        destroy(where: {id:id}) destroy(where: {})

Create Controller:
    - create controllers folder in root and create records.controller.js
    - It contains CRUD functions such as create, findAll, findOne, update,
    delete, deleteAll
    - Implement all methods there

    - {Come back here for pagination and query control}

Define Routes:
    - Determine request (GET,POST,PUT,DELETE) and response of servers
    - Create routes folder in app and records.routes.js file in it
    - Make sure api/records address should be entry point for the api

Run Server: node server.js
Check API calls such as GET, PUT using Postman app

_______________
Step 1.5: Server side pagination

Follow steps in modifications in controllers:
https://bezkoder.com/node-js-sequelize-pagination-mysql/


_______________
Step 2: React Table pagination with search

https://bezkoder.com/react-pagination-material-ui/

- 1> Setup Reactjs Application npx create-react-app react-client-pagination
- 2> Follow this to complete the CRUD app: https://bezkoder.com/react-material-ui-examples-crud/
- 3> Come back to here

- More details about <2>
    - go inside react-client-pagination folder
    - npm install @material-ui/core 
    - npm install react-router-dom 
    - Open src/index.js and wrap App component by BrowserRouter object.
    - add appbar to src/App.js
    - add services, components
    - after done with records-list.component, modify it with pagination given at https://bezkoder.com/react-pagination-material-ui/
    - in project folder, create .env file with PORT=8081
    - come back from pagination
    - componentDidMount() lifecycle method to fetch data from API.
    - create record.component.js
    - 

- Last Minute New Updates

- Add US state dropdown select bar:
    Follow src code from github directory: (No need to install this package)
    Get states.json file from repository and add it to src folder.
    https://www.npmjs.com/package/react-select-us-states

- Get results in ascending order of school names
  Modify order:ordering in backend record.controllers


Run server in backend folder: node server.js
Run client in frontend folder: npm start




CtP color: #296D80

Project 2: http://changingthepresent.pythonanywhere.com/  COLLEGE SEARCH exactly like this

Follow this page to create simple dynamic search bar:
https://www.emgoto.com/react-search-bar/

--------------------------------------------------------------------------------

Project 3:

Design a database ER diagram and schemas. Then set the queries to search.

Create APIs for the customized filters in nodejs-express-sequelize-mysql backend folder.

Duplicate project 1 and start implementing the services and modify the components.


-----------------------------------------------------------------------------

Project 4: Follower - Following

Get User photos and names:
https://changingthepresent.org/collections/george-washington-high-school-10002

Done:
https://cdn.shopify.com/s/files/1/1842/4701/products/alex_200x200.jpg?v=1574125865
https://cdn.shopify.com/s/files/1/1842/4701/products/ali_200x200.jpg?v=1574125863
https://cdn.shopify.com/s/files/1/1842/4701/products/726011439276018bd95820d60ac74475_square_e6896467-f018-440d-8dc2-bb812041a8d7_200x200.jpg?v=1574124402
https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy3a_200x200.jpg?v=1604425464
https://cdn.shopify.com/s/files/1/1842/4701/products/CourtneySadlersquare_200x200.png?v=1603744572
https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy2_200x200.jpg?v=1604425329
https://cdn.shopify.com/s/files/1/1842/4701/products/HSgirl_200x200.jpg?v=1604424844
https://cdn.shopify.com/s/files/1/1842/4701/products/HSstudentpic_200x200.png?v=1604424633
https://cdn.shopify.com/s/files/1/1842/4701/products/jordan_200x200.jpg?v=1574125870
https://cdn.shopify.com/s/files/1/1842/4701/products/matt_200x200.jpg?v=1574125861
https://cdn.shopify.com/s/files/1/1842/4701/products/mckayla_200x200.jpg?v=1574125867
https://cdn.shopify.com/s/files/1/1842/4701/products/mollie_200x200.jpg?v=1574125876
https://cdn.shopify.com/s/files/1/1842/4701/products/monica_200x200.jpg?v=1574125879
https://cdn.shopify.com/s/files/1/1842/4701/products/Richard_Aved_200x200.jpg?v=1603685528
https://cdn.shopify.com/s/files/1/1842/4701/products/78452403_1357430384416366_7086704722823872512_n_200x200.jpg?v=1619985012
https://cdn.shopify.com/s/files/1/1842/4701/products/pic_square_1_200x200.jpg?v=1571609819


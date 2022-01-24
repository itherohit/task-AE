# MOTORQ task-AE

### App Link - [https://motorq-c1c5e.web.app/](https://motorq-c1c5e.web.app/)
### API Endpoint - [https://motorq.herokuapp.com/](https://motorq.herokuapp.com/)

![Dashboard](Screenshots/MapWithMarkerClusters.PNG)

## Run Project

Clone the project

```bash
git clone https://github.com/itherohit/task-AE.git
```

### Start Backend Server

Change directory to Backend and install packages

```bash
cd Backend
npm i
```

Add a `.env` file on the BackEnd Folder and inside the .env file add MONGO_DB Url or use the below
```bash
MONGO_DB = mongodb+srv://itherohit:admin@cluster0.hfpba.mongodb.net/Motorq?retryWrites=true&w=majority
```

### Start the server

```bash
nodemon index.js
```

Server should run in http://localhost:5000/ 


### Run the FrontEnd

Change directory to Frontend and install packages

```bash
cd Frontend
npm i
```

Add a `.env` file on the Frontend Folder and inside the .env file add
```bash
REACT_APP_DEV_SERVER = http://localhost:5000
REACT_APP_PROD_SERVER = https://motorq.herokuapp.com
```

Start the React app using

```bash
npm start
```

Web App will be available on http://localhost:3000/ 


## Things Done

✔️ Created API Endpoints GET - /vehicles with params (vin,driver,licensePlate,count and page) and PATCH - /vehicles/:id <br>
✔️ Created the app using React added map using react-leaflet along with marker clusters. <br>
✔️ Added Popups on over on the markers. <br>
✔️ Added /vehicles which displays all vehicles in Tabular manner. <br>
✔️ Added Search functionality using Vin, Driver, LicensePlate. <br>
✔️ Each Vehicle Data can be edited and saved. <br>

## Extra Features

✔️ Added Dark mode. <br>
✔️ Added Search Feature on Map using Vin and automatic zoom based on Vin data. <br>
✔️ Added React Toast Notifications on Updates. <br>

Frontend Devleoped using ReactJs and TailwindCss. <br>
Backend Developed using MongoDB, NodeJs and Express Framework.

Since I have used TailwindCss which is a inline css ClassNames will be big.

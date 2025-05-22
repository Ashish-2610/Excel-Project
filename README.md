project-root/
│
├── controllers/            # Route logic and business rules
│   └── excelSheetController.js
│
├── models/                 # Mongoose models
│   ├── agent.js
│   ├── user.js
│   ├── account.js
│   ├── policy.js
│   ├── category.js
│   ├── carrier.js
│   └── message.js
│
├── routes/                 # API route definitions
│   └── excelSheetRoutes.js
│
├── agenda.js              # Agenda job scheduler setup
├── db.js                  # MongoDB connection
├── main.js                # Entry point / Express server
├── package.json           # Project dependencies and scripts
└── .env                   # Environment variables

Setup Instructions
1. git clone <repo-url>
2. cd <project-folder>
3. npm install
4. Create a .env file (see below)
5. npm run start
 # or to run in the background
   pm2 start main.js --name excel-project
6. pm2 stop excel-project(To stop the server when running with PM2)
7. pm2 restart excel-project(To restart the server with PM2 manually)

.ENV SAMPLE 
MONGO_URI = MongoDbURL
JOB_NAME = job-name

API ENDPOINTS:-
1. Upload Policies via CSV
    POST /api/upload
    Upload a .csv file via multipart/form-data
    Required headers: Content-Type: multipart/form-data
    File field name: file

2. Search Policies by User First Name
    GET /api/search-policy?firstName=Torie Buchanan
    Filters policies linked to a user by first name (case-insensitive)

3. Aggregate Policies by User
    GET /api/aggregate/by/user
    Aggregates policy count for each user

4. Schedule a Message
    POST /api/schedule-message
    Sample Body:
    {   
        "message": "String",
        "day": "YYYY-MM-DD",
        "time": "HH:MM:SS"(08:33:00)(24 Hours Format)
    }

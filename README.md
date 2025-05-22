# Excel Project
**project-root/ **<br>
│<br>
├── controllers/            # Route logic and business rules<br>
│   └── excelSheetController.js<br>
│
├── models/                 # Mongoose models<br>
│   ├── agent.js<br>
│   ├── user.js<br>
│   ├── account.js<br>
│   ├── policy.js<br>
│   ├── category.js<br>
│   ├── carrier.js<br>
│   └── message.js<br>
│
├── routes/                 # API route definitions<br>
│   └── excelSheetRoutes.js<br>
│
├── agenda.js              # Agenda job scheduler setup<br>
├── db.js                  # MongoDB connection<br>
├── main.js                # Entry point / Express server<br>
├── package.json           # Project dependencies and scripts<br>
└── .env                   # Environment variables<br>

Setup Instructions<br>
1. git clone <repo-url><br>
2. cd <project-folder><br>
3. npm install<br>
4. Create a .env file (see below)<br>
5. npm run start<br>
   or to run in the background<br>
   pm2 start main.js --name excel-project<br>
6. pm2 stop excel-project(To stop the server when running with PM2)<br>
7. pm2 restart excel-project(To restart the server with PM2 manually)<br>
<br>
** .ENV SAMPLE ** <br>
MONGO_URI = MongoDbURL<br>
JOB_NAME = job-name<br>
<br>
**API ENDPOINTS **<br>
1. Upload Policies via CSV<br>
    POST /api/upload<br>
    Upload a .csv file via multipart/form-data<br>
    Required headers: Content-Type: multipart/form-data<br>
    File field name: file<br>
<br>
2. Search Policies by User First Name<br>
    GET /api/search-policy?firstName=Torie Buchanan<br>
    Filters policies linked to a user by first name (case-insensitive)<br>
<br>
3. Aggregate Policies by User<br>
    GET /api/aggregate/by/user<br>
    Aggregates policy count for each user<br>
<br>
4. Schedule a Message<br>
    POST /api/schedule-message<br>
    Sample Body:<br>
    {   <br>
        "message": "String",<br>
        "day": "YYYY-MM-DD",<br>
        "time": "HH:MM:SS"(08:33:00)(24 Hours Format)<br>
    }<br>

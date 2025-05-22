commands:- 
1. npm install
2. MONGO_URI=your_mongo_connection_string
3. npm run start or pm2 start
4. if we need to server when pm2 is running then give pm2 stop
5. if we need to restart server with pm2 then give command pm2 restart 

API ENDPOINTS:-
1. POST localhost:3000/api/upload
2. GET localhost:3000/api/search-policy?firstName=Torie Buchanan
3. GET localhost:3000/api/aggregate/by/user
4. POST localhost:3000/api/schedule-message -> BODY{   
        "message": "String",
        "day": "YYYY-MM-DD",
        "time": "HH:MM:SS"(08:33:00)(24 Hours Format)
    }

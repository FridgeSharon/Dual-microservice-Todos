# PayboxToDos - Guy Sharon
Simple dual-microservice notificationsMS to manage to-dos

## How to?
- run `npm i` in the main project folder.
- use `npm run start` in each of the sub folders/project: `notifications` and `todos`.

## About the timer:
- using Node Chron job, the scheduling is done by patterns.
- See https://www.npmjs.com/package/node-schedule for more details.
- Even though deadline is exampled as Days, the schedule is set for 15 seconds, this allows room to play.

## Almost infinite possibilities to improves this app, among others:
- Extract all repeated code to be re-used instead of repeated.
- Returning proper HTTP codes on missing info or failures instead of throwing errors.
- Extracting some shared code between the two Microservices into Node Modules.
- Better validation of input to prevent injections and arbitrary code executions.

All of these could be implemented given a few more hours, I decided to serve this code as it is in this state.

### About the DB:
Microservices should have their own DB.  
I decided to use MongoDB Atlas in Free tier.  
Due to free tier limitations, both microservices use the same DB but different collections.  
I created separate usernames for each microservice to connect to the DB.  
Connection is not limited to any specific IP, so it should work from anywhere in the world.
In real services, the connection between these two microservices would be internal, and not open to the public.
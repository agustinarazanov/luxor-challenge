## How to run de code

To set up the application, first load the data.sql file located in the root directory into a PostgreSQL server. After loading the data, create a .env file with the following variables:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/luxor
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=
AUTH_DRIZZLE_URL=postgresql://postgres:postgres@localhost:5432/luxor
```

Run the following commands to start the development server:

```
pnpm i
pnpm dev
```

## Visit the Vercel deployment site

The application is deployed on Vercel, with all necessary data preloaded into Vercel's PostgreSQL database. The site is live and ready for testing. You can access it at: https://luxor-challenge.vercel.app.

Logging in is straightforward, requiring only an email and password. Below are the available test credentials:

-   john@example.com
-   audrey@example.com
-   austin@example.com
-   rosa@example.com
-   amy@example.com
-   sophia@example.com
-   danielle@example.com
-   harper@example.com
-   alexa@example.com
-   lena@example.com

The password for all test users is **12345**. Each user has been preassigned a random number of collections and bids, ensuring meaningful test scenarios.

## Q&A

1. How would you monitor the application to ensure it is running smoothly?

    To keep everything running smoothly, it's a good idea to use logging and monitoring tools, like the ones Vercel provides. These can help track any issues with the server, performance, or errors. Setting up notifications for things like server downtime or database problems can make sure that any issues are caught and dealt with quickly. Also, using application performance monitoring (APM) tools can help pinpoint slow queries or any other bottlenecks.

2. How would you address scalability and performance?

    Improving scalability and performance can be done by optimizing backend database queries to make them faster and reducing server load. Caching frequently accessed data, maybe using something like Redis, can help speed up response times. If the app were containerized, using something like Kubernetes could allow it to scale automatically, adding more instances as traffic grows. This setup would not only make the app faster but also more reliable during heavy traffic.

3. Trade-offs and Improvements

    There are a few things that could make the app better. For example, improving error handling and showing clearer error messages would help users figure out what went wrong. Right now, users have to refresh the page manually to see updates, so adding real-time updates would make the app feel more responsive. Adding features like pagination and search filters would make navigating large datasets way easier. These improvements would take some extra work but would make the app more user-friendly and efficient overall.

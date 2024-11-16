
# Api-Optimizer

api-optimizer is a lightweight and efficient Node.js package for optimizing APIs by providing middleware for rate limiting and caching with Redis. It helps in improving performance, preventing abuse, and managing load effectively.

## Features

🚦 Rate Limiting: Prevent excessive API calls by limiting requests per IP in a specified time window.
⚡ Caching: Cache responses to reduce database load and improve response time.
💾 Redis Integration: Leverages Redis for distributed caching and rate limit storage.
🔧 Customizable: Configure rate limits, caching duration, and more.


## Rate Limiting

### Installation : 

npm install api-optimizer

### Imports & Use : 

#### import {createRateLimit} from "api-optimizer";

const limiter = new createRateLimit({ 
    windowMs: 60 * 1000, 
    max: 5,
    message:"Too many requests"});

app.use(limiter);

### Options :

| Options          | Description                       | Default Value |
|------------------|-----------------------------------|---------------|
| `windowMs`       | Time window in milliseconds       | `60000`       |
| `max`            | Maximum requests per time window  | `5`          |
| `message`        | Error message when rate-limited   | `"Too many requests, please try again later."` |






## Caching with redis

### Installation:

npm install api-optimizer

### Import & Use:

#### import {initializeRedis} from "api-optimizer";

initializeRedis({
  url: 'redis://<your-redis-host>:<port>',
  password: '<your-redis-password>',
});


#### import {setCache,getCache,deleteCache} from "api-optimizer";

await setCache('key', { data: 'value' }, 3600); // Cache for 3600 seconds


const value = await getCache('key');

await deleteCache('key');


### Options:





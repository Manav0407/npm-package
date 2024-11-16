// fixedWindowRateLimiter.js
import { client, connectRedis } from "../redisClient.js";

const fixedWindowRateLimiter = (maxRequests, windowSeconds) => {
    return async (req, res, next) => {
        await connectRedis();  // Ensure Redis client is connected

        const userKey = `fixed_window:${req.ip}`;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const windowEnd = currentTimestamp + windowSeconds;

        try {
            const requestCount = await client.get(userKey);
            if (!requestCount) {
                await client.set(userKey, 1, {
                    EX: windowSeconds,
                    NX: true,
                });
                return next();
            }

            if (parseInt(requestCount) >= maxRequests) {
                return res.status(429).send("Too Many Requests");
            }

            await client.incr(userKey);
            next();
        } catch (err) {
            console.error("Redis error:", err);
            res.status(500).send("Internal Server Error");
        }
    };
};

export {fixedWindowRateLimiter};
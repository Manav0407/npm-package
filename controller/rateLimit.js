const rateLimits = {}; // Store request counts and timestamps for each IP address

export default function createRateLimit(options = {}) {
  const windowMs = options.windowMs || 15*60* 1000; // Default time window: 1 minute
  const max = options.max || 10; // Default max requests per window
  const message = options.message || "Too many requests, please try again later.";

  return (req, res, next) => {
    const ip = req.ip;
    const currentTime = Date.now();

    if (!rateLimits[ip]) {
      // Initialize for the IP if not present
      rateLimits[ip] = { count: 1, startTime: currentTime };
      next();
    } else {
      const timeElapsed = currentTime - rateLimits[ip].startTime;

      if (timeElapsed < windowMs) {
        // Within the time window
        rateLimits[ip].count += 1;

        if (rateLimits[ip].count > max) {
          // Exceeded max requests
          res.status(429).json({ message });
        } else {
          // Under limit, proceed to the next middleware
          next();
        }
      } else {
        // Reset count after the window passes
        rateLimits[ip] = { count: 1, startTime: currentTime };
        next();
      }
    }
  };
}

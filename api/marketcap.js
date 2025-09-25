// Cache variables (stored in memory)
let cachedData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5000; // 5 seconds in milliseconds

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const now = Date.now();

    // Check if we have cached data that's still fresh
    if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
      console.log('Returning cached data');
      return res.json(cachedData);
    }

    // Cache is expired or doesn't exist, fetch fresh data
    console.log('Fetching fresh data from Moralis');
    const url = https://solana-gateway.moralis.io/token/mainnet/${process.env.CONTRACT_ADDRESS}/price;

    const response = await fetch(url, {
      headers: {
        "X-API-Key": process.env.MORALIS_API_KEY,
        accept: "application/json"
      }
    });

    if (!response.ok) throw new Error(Moralis error: ${response.status});
    const data = await response.json();

    // Update cache
    cachedData = data;
    lastFetchTime = now;

    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err);

    // If we have cached data and the API fails, return cached data
    if (cachedData) {
      console.log('API failed, returning cached data as fallback');
      return res.json(cachedData);
    }

    res.status(500).json({ error: "Failed to fetch market cap" });
  }
}
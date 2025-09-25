export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const url = `https://solana-gateway.moralis.io/token/mainnet/${process.env.CONTRACT_ADDRESS}/price`;
    
    const response = await fetch(url, {
      headers: {
        "X-API-Key": process.env.MORALIS_API_KEY,
        accept: "application/json"
      }
    });

    if (!response.ok) throw new Error(`Moralis error: ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Failed to fetch market cap" });
  }
}

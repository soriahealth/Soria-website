export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, first_name, last_name } = req.body;
  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUB_ID}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`
      },
      body: JSON.stringify({ email, first_name, last_name, reactivate_existing: true, send_welcome_email: true })
    }
  );
  const data = await response.json();
  res.status(200).json(data);
}

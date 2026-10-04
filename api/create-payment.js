export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const auth = Buffer.from(
      `${process.env.PAYUNIT_API_USER}:${process.env.PAYUNIT_API_PASSWORD}`
    ).toString("base64");

    const host = req.headers.host;
    const baseUrl = `https://${host}`;

    const transactionId = `SS${Date.now()}`;

    const response = await fetch(
      "https://gateway.payunit.net/api/gateway/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`,
          "x-api-key": process.env.PAYUNIT_API_KEY,
          "mode": "live"
        },
        body: JSON.stringify({
          total_amount: 1500,
          currency: "XAF",
          transaction_id: transactionId,
          return_url: `${baseUrl}/payment-success`,
          notify_url: `${baseUrl}/api/payunit-webhook`,
          payment_country: "CM"
        })
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de l'initialisation du paiement"
    });
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    console.log("Notification PayUnit reçue :", req.body);

    return res.status(200).json({
      success: true,
      message: "Notification PayUnit reçue"
    });

  } catch (error) {
    console.error("Erreur webhook :", error);

    return res.status(500).json({
      error: "Erreur lors du traitement de la notification"
    });
  }
}

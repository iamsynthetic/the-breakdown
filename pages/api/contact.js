export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, topic, message, company } = req.body ?? {};

  // Honeypot: real visitors never see this field, so any value means a bot
  if (company) return res.status(200).json({ ok: true });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !name?.trim() ||
    !message?.trim() ||
    !emailPattern.test(email ?? "") ||
    name.length > 100 ||
    message.length > 5000
  ) {
    return res.status(400).json({ error: "Invalid submission" });
  }

  // TODO: send the message somewhere (see notes below)
  console.log("Contact form:", { name, email, topic, message });

  return res.status(200).json({ ok: true });
}

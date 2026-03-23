import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { contacts } from "$lib/server/schema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST({ request }) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return json({ error: "All fields required" }, { status: 400 });
  }

  db.insert(contacts).values({
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  }).run();

  const { error } = await resend.emails.send({
    from: "ReelMovies <onboarding@resend.dev>", 
    to: ["alexdaly03@outlook.ie"],
    subject: `New Contact Message from ${name}`,
    html: `
      <h3>New Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>${message}</p>
    `
  });

  if (error) {
    return json({ error: "Email failed to send" }, { status: 500 });
  }

  return json({ success: true });
}
import { createContact } from "$lib/server/data-access/contact-data-access";
import { Resend } from "resend";
import { RESEND_API_KEY } from "$reelmovies/.env";

const resend = new Resend(RESEND_API_KEY);

export async function submitContactForm({ name, email, message }) {

  if (!name || !email || !message) {
    throw new Error("All fields required");
  }

  createContact({ name, email, message });

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
    throw new Error("Email failed to send");
  }

  return { success: true };
}
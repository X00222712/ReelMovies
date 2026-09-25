/*

Author : Alex Daly

Description
API to send an email to a user about their contact form details

*/

// Third part
import { json } from "@sveltejs/kit";
// import { Resend } from "resend";
// Ours
import { createContact } from "$lib/server/data-access/contact-data-access";
import { RESEND_API_KEY } from '$env/static/private';

// const resend = new Resend(RESEND_API_KEY);
export async function POST({ request }) {
  const data = await request.json()
  const name = data.name
  const email = data.email
  const message = data.message

  if (!name || !email || !message) {
    throw new Error("All fields required");
  }

  await createContact({ name, email, message });

  // const { error } = await resend.emails.send({
  //   from: "ReelMovies <onboarding@resend.dev>",
  //   to: [email],
  //   subject: `New Contact Message from ${name}`,
  //   html: `
  //     <h3>New Message</h3>
  //     <p><strong>Name:</strong> ${name}</p>
  //     <p><strong>Email:</strong> ${email}</p>
  //     <p>${message}</p>
  //   `
  // });

  // Resend disabled due to error in live host
  const error = true
  if (error) {
    console.log(error)
    throw new Error("Email failed to send");
  }

  return json({ success: true }, {status : 200});
}
"use server";

import nodemailer from "nodemailer";
import { google } from "googleapis";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const redirectUri = process.env.REDIRECT_URI;
const authEmail = process.env.AUTH_EMAIL;
const creatorEmail = process.env.CREATOR_EMAIL;

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri,
);

oAuth2Client.setCredentials({
  refresh_token: refreshToken,
});

type Data = {
  name: string;
  email: string;
  message: string;
};

export async function sendMail(data: Data) {
  try {
    const { name, email, message } = data;
    const accessToken = (await oAuth2Client.getAccessToken()) as string;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: authEmail,
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
      },
    });

    const template = `
  <html>
  <body>
  <h2>Client mailed</h2>
  <h3><strong>Name :</strong> ${name.toUpperCase()}</h3>
  <p><strong>Email :</strong> ${email}</p>
  <p><strong>Message :</strong>
  <span>${message}</span>
  </p>
  </body>
  </html>
  `;
    const mailOptions: nodemailer.SendMailOptions = {
      from: authEmail,
      to: creatorEmail,
      subject: "Mail from User",
      html: template,
    };
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to send email",
      error
    };
  }
}

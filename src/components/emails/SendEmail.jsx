import { Resend } from "resend";
import ResultsEmail from "./ResultsEmail";

const resend = new Resend(import.meta.env.VITE_APP_RESEND_API_KEY);

export const sendEmail = async (toEmail, subject, message, url) => {
  try {
    await resend.emails.send({
      from: "team@mqiproject.com",
      to: "abasalmaayofi@gmail.com",
      subject,
      react: <ResultsEmail />,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

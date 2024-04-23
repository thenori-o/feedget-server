import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2bae59296ab790",
    pass: "658839f314b826"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  });

  await transport.sendMail({
    from: 'Feedget team <noreply.@feedget.com>',
    to: 'Lucas Tenorio <lucas@outlook.com>',
    subject: 'New feedback',
    html: [
      `<div style='font-family: sans-serif; font-size: 16px; color: #111'>`,
      `<p>Feedback type: ${type}</p>`,
      `<p>Comment: ${comment}</p>`,
      `</div>`,
    ].join('\n')
  })

  return res.status(201).json({ data: feedback });
});

app.listen(PORT, () => {
  console.log('HTTP server running on port', PORT);
});
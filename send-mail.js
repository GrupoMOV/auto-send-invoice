"use strict";
import nodemailer from "nodemailer";
import fs from "fs";

const transporter = nodemailer.createTransport({
  host: "mail.grupomov.com.br",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: ""
  }
});

export async function sendMail(company, fatura, files2) {
  const files = fs
    .readdirSync("./boletos")
    .filter((file) => file.endsWith(".pdf"));

  let attachments = [];
  for (const file of files) {
    if (file.includes(company.name)) {
      attachments.push({
        filename: file,
        path: `./boletos/${file}`,
        contentType: "application/pdf"
      });
    }
  }

  for (const file of files2) {
    attachments.push({
      filename: file.file,
      path: `./faturas/${file.file}.pdf`,
      contentType: "application/pdf"
    });
  }

  const info = await transporter.sendMail({
    from: "paulo.oliveira@grupomov.com.br", // sender address
    to: "paulorievrsoliveira@gmail.com", // list of receivers
    subject: `FATURA MOVSERV 0216  (${company.name} + ${fatura}) - ${company.name}`, // Subject line
    text: `Prezados, bom dia! Segue em anexo fatura de locação de equipamentos. Gentileza confirmar   recebimento. Estamos à disposição para qualquer esclarecimento.`, // plain text body
    html: `Prezados, bom dia!<br /> <br />
          Segue em anexo fatura de locação de equipamentos.<br /> <br />
          Gentileza confirmar o recebimento.<br /> <br />
          Estamos à disposição para qualquer esclarecimento.<br /> <br />
    `, // html body,
    attachments
  });

  console.log("Message sent: %s", info.messageId);
}

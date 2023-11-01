import pdfjsLib from "pdfjs-dist";
import fs from "fs";
import { findCnpj } from "./find-cnpj.js";
export const MOV_CNPJ = "04.850.984/0001-50";
import { read_excel } from "./read-excel.js";
import { sendMail } from "./send-mail.js";

async function GetTextFromPDF(path) {
  const doc = await pdfjsLib.getDocument(path).promise;
  const page1 = await doc.getPage(1);
  const content = await page1.getTextContent();
  const strings = content.items.map(function (item) {
    return item.str;
  });

  return strings;
}

async function handleReadAllPdfFromPath() {
  const files = fs
    .readdirSync("./faturas")
    .filter((file) => file.endsWith(".pdf"));
  const excel = read_excel();
  const obj = {};

  for (const file of files) {
    const text = await GetTextFromPDF("./faturas/" + file);
    const flatCnpjs = text
      .map((line) => {
        const cnpj = findCnpj(line);
        const x = cnpj?.filter(
          (c) => c !== MOV_CNPJ && c !== null && c !== undefined
        );
        return {
          cnpj: x,
          file
        };
      })
      .filter(
        (c) =>
          c !== null &&
          c !== undefined &&
          c.cnpj !== undefined &&
          c.cnpj.length > 0
      );

    for (const c of flatCnpjs) {
      const found = excel.find(
        ({ cnpj: cnpjExcel }) => cnpjExcel === c.cnpj[0]
      );
      if (found) {
        if (obj[found.cnpj] === undefined) {
          obj[found.cnpj] = [{ file: c.file.split(".")[0], found }];
        } else {
          obj[found.cnpj].push({ file: c.file.split(".")[0], found });
        }
        //await sendMail(found, c.file.split(".")[0]);
      }
    }
  }

  for (const o in obj) {
    await sendMail(obj[o][0].found, obj[o][0].file, obj[o]);
  }
}

(async () => handleReadAllPdfFromPath())();

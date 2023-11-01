import xlsx from "node-xlsx";

export const read_excel = () => {
  const [obj] = xlsx.parse("./emails.xlsx"); // parses a file
  const data = obj.data;
  return data
    .slice(0, data.length - 1)
    .map(([name, cnpj, emails]) => ({
      name,
      cnpj,
      emails: emails?.replaceAll(";", ",")
    }))
    .filter(
      ({ emails }) => emails !== undefined && emails !== null && emails !== ""
    );
};

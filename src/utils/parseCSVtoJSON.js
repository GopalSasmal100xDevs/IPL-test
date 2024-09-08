import fs from "fs";
import { parse } from "csv-parse";
import { saveDataInFile } from "./saveFileInJSON.js";

export function parseCSVFileToJSON(path, newFilePath) {
  const data = [];
  fs.createReadStream(path)
    .pipe(
      parse({
        delimiter: ",",
        columns: true,
        ltrim: true,
      })
    )
    .on("data", (row) => {
      data.push(row);
    })
    .on("error", (error) => {
      console.log(error.message);
    })
    .on("end", () => {
      saveDataInFile(data, newFilePath);
    });
}

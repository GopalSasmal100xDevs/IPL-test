import fs from "fs";
import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const deliveriesPath = path.join(__dirname, "../data/deliveries.csv");
const matchesFilePath = path.join(__dirname, "../data/matches.csv");
const deliveriesJSONPath = path.join(__dirname, "../data/deliveries");
const matchesJSONPath = path.join(__dirname, "../data/matches");

function saveDataInFile(data, path) {
  writeFileSync(`${path}.json`, JSON.stringify(data, null, 2));
}

function parseCSVFileToJSON(path, newFilePath) {
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

parseCSVFileToJSON(deliveriesPath, deliveriesJSONPath);
parseCSVFileToJSON(matchesFilePath, matchesJSONPath);

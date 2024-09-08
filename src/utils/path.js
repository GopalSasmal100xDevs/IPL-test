import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
import path from "path";

export const deliveriesPath = path.join(__dirname, "../data/deliveries.csv");
export const matchesFilePath = path.join(__dirname, "../data/matches.csv");
export const deliveriesJSONPath = path.join(__dirname, "../data/deliveries");
export const matchesJSONPath = path.join(__dirname, "../data/matches");

export const matchesPerYearPath = path.join(
  __dirname,
  "../public/output/matchesPerYear"
);

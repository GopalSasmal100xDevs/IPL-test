import { parseCSVFileToJSON } from "../utils/parseCSVtoJSON.js";

import {
  deliveriesPath,
  deliveriesJSONPath,
  matchesFilePath,
  matchesJSONPath,
} from "../utils/path.js";

function main() {
  parseCSVFileToJSON(deliveriesPath, deliveriesJSONPath);
  parseCSVFileToJSON(matchesFilePath, matchesJSONPath);
}
main();

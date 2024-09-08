import { writeFileSync } from "fs";

export function saveDataInFile(data, path) {
  writeFileSync(`${path}.json`, JSON.stringify(data, null, 2));
}

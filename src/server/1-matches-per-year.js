import matches from "../data/matches.json" assert { type: "json" };
import { matchesPerYearPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";

export function matchesPlayedPerYear(matches) {
  const years = {};
  matches.forEach((match) => {
    const { season } = match;
    if (years[season]) {
      years[season] += 1;
    } else {
      years[season] = 1;
    }
  });
  return years;
}

function saveResult(data, path) {
  if (data.length == 0) {
    return;
  }

  saveDataInFile(data, path);
}

const res = matchesPlayedPerYear(matches);
saveResult(res, matchesPerYearPath);

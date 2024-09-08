import matches from "../data/matches.json" assert { type: "json" };
import { saveDataInFile } from "../utils/saveFileInJSON.js";
import { matchesWonParTeamParYearPath } from "../utils/path.js";

export function matchesWonPerTeamParYear(matches) {
  const winnerTeamPerYear = {};
  matches.forEach((match) => {
    const { season, winner } = match;
    if (winnerTeamPerYear[season]) {
      if (winnerTeamPerYear[season][winner]) {
        winnerTeamPerYear[season][winner] += 1;
      } else {
        winnerTeamPerYear[season][winner] = 1;
      }
    } else {
      winnerTeamPerYear[season] = {};
      winnerTeamPerYear[season][winner] = 1;
    }
  });
  return winnerTeamPerYear;
}

const data = matchesWonPerTeamParYear(matches);
saveDataInFile(data, matchesWonParTeamParYearPath);

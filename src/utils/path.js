import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
import path from "path";

export const deliveriesPath = path.join(__dirname, "../data/deliveries.csv");
export const matchesFilePath = path.join(__dirname, "../data/matches.csv");
export const deliveriesJSONPath = path.join(__dirname, "../data/deliveries");
export const matchesJSONPath = path.join(__dirname, "../data/matches");

const outputPath = "../public/output";

export function generateOutputPath(fileName) {
  return path.join(__dirname, `${outputPath}/${fileName}`);
}

export const matchesPerYearPath = generateOutputPath("matchesPerYear");
export const matchesWonParTeamParYearPath = generateOutputPath(
  "matchesWonParTeamParYear"
);
export const extraRunsConcededPerTeamIn2016Path = generateOutputPath(
  "extraRunsConcededPerTeamIn2016"
);
export const top10EconomicalBowlersIn2015Path = generateOutputPath(
  "top10EconomicalBowlersIn2015"
);
export const teamsWonTossWonMatchPath = generateOutputPath(
  "teamsWonTossWonMatch"
);
export const playerOfTheMatchEachSeasonPath = generateOutputPath(
  "playerOfTheMatchEachSeason"
);
export const batsmanStrikeRateEachSeasonPath = generateOutputPath(
  "batsmanStrikeRateEachSeason"
);
export const bestEconomyInSuperOversPath = generateOutputPath(
  "bestEconomyInSuperOvers"
);
export const highestNumberDismissedByAnotherPlayerPath = generateOutputPath(
  "highestNumberDismissedByAnotherPlayer"
);

export const teamsTotalSixesEachSeasonPath = generateOutputPath(
  "teamsTotalSixesEachSeason"
);
export const mostRunGetterBatsmanEachSeasonPath = generateOutputPath(
  "mostRunGetterBatsmanEachSeason"
);

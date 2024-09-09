import matches from "../data/matches.json" assert { type: "json" };
import { playerOfTheMatchEachSeasonPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";

export function highestNoOfPlayerOfTheMatch(matches) {
  if (!matches) return {};

  const allPlayerOfTheMatch = {};
  for (let match of matches) {
    const { season, player_of_match } = match;
    if (allPlayerOfTheMatch[season]) {
      if (allPlayerOfTheMatch[season][player_of_match]) {
        allPlayerOfTheMatch[season][player_of_match] += 1;
      } else {
        allPlayerOfTheMatch[season][player_of_match] = 1;
      }
    } else {
      allPlayerOfTheMatch[season] = {};
      allPlayerOfTheMatch[season][player_of_match] = 1;
    }
  }
  const allPLayerOfTheMatchArray = Object.entries(allPlayerOfTheMatch);

  // sort by player of the match
  const playerOfTheMatchEachSeason = {};
  for (let playersInfo of allPLayerOfTheMatchArray) {
    const [year, players] = playersInfo;
    const allPlayersSort = Object.entries(players).sort((a, b) => b[1] - a[1]);
    const player = allPlayersSort.slice(0, 1);
    const [playerName, playerOfTheMatchCount] = player[0];

    if (playerOfTheMatchEachSeason[year]) {
      playerOfTheMatchEachSeason[year][playerName] = playerOfTheMatchCount;
    } else {
      playerOfTheMatchEachSeason[year] = {};
      playerOfTheMatchEachSeason[year][playerName] = playerOfTheMatchCount;
    }
  }

  return playerOfTheMatchEachSeason;
}

const data = highestNoOfPlayerOfTheMatch(matches);
saveDataInFile(data, playerOfTheMatchEachSeasonPath);

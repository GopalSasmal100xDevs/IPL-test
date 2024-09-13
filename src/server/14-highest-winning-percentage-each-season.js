import matches from "../data/matches.json" assert { type: "json" };
import deliveries from "../data/deliveries.json" assert { type: "json" };
import { highestWinningPercentageTeamEachSeasonPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";

export function getHighestWinningPercentageEachSeason(deliveries, matches) {
  if (!deliveries || !matches) {
    return {};
  }

  const eachSeasonWinningTeams = {};

  for (let match of matches) {
    const { season, team1, team2, winner, result } = match;

    if (!eachSeasonWinningTeams[season]) {
      eachSeasonWinningTeams[season] = {};
    }

    if (!eachSeasonWinningTeams[season][team1]) {
      eachSeasonWinningTeams[season][team1] = {};
    }

    if (!eachSeasonWinningTeams[season][team2]) {
      eachSeasonWinningTeams[season][team2] = {};
    }

    if (winner === team1) {
      if (!eachSeasonWinningTeams[season][team1]["wins"]) {
        eachSeasonWinningTeams[season][team1]["wins"] =
          result === "normal" ? 1 : 0;
      } else if (eachSeasonWinningTeams[season][team1]["wins"]) {
        eachSeasonWinningTeams[season][team1]["wins"] +=
          result === "normal" ? 1 : 0;
      }
    } else {
      if (!eachSeasonWinningTeams[season][team2]["wins"]) {
        eachSeasonWinningTeams[season][team2]["wins"] =
          result === "normal" ? 1 : 0;
      } else if (eachSeasonWinningTeams[season][team2]["wins"]) {
        eachSeasonWinningTeams[season][team2]["wins"] +=
          result === "normal" ? 1 : 0;
      }
    }

    // team1
    if (!eachSeasonWinningTeams[season][team1]["totalMatch"]) {
      eachSeasonWinningTeams[season][team1]["totalMatch"] = 1;
    } else if (eachSeasonWinningTeams[season][team1]["totalMatch"]) {
      eachSeasonWinningTeams[season][team1]["totalMatch"] += 1;
    }

    // team2
    if (!eachSeasonWinningTeams[season][team2]["totalMatch"]) {
      eachSeasonWinningTeams[season][team2]["totalMatch"] = 1;
    } else if (eachSeasonWinningTeams[season][team2]["totalMatch"]) {
      eachSeasonWinningTeams[season][team2]["totalMatch"] += 1;
    }
  }

  // calculate winning percentage
  for (let season in eachSeasonWinningTeams) {
    for (let team in eachSeasonWinningTeams[season]) {
      const { wins, totalMatch } = eachSeasonWinningTeams[season][team];
      const winningPercentage = ((wins / totalMatch) * 100).toFixed(2);
      eachSeasonWinningTeams[season][team]["winningPercentage"] =
        winningPercentage;
    }
  }

  // find highest winning percentage
  const highestWinningPercentage = {};
  for (let season in eachSeasonWinningTeams) {
    let maxWinningPercentage = 0;
    let maxWinningPercentageTeam = "";

    for (let team in eachSeasonWinningTeams[season]) {
      const { winningPercentage } = eachSeasonWinningTeams[season][team];
      if (maxWinningPercentage < winningPercentage) {
        maxWinningPercentage = winningPercentage;
        maxWinningPercentageTeam = team;
      }
    }
    highestWinningPercentage[season] = {
      team: maxWinningPercentageTeam,
      winningPercentage: maxWinningPercentage,
    };
  }

  return highestWinningPercentage;
}

function main() {
  const data = getHighestWinningPercentageEachSeason(deliveries, matches);
  saveDataInFile(data, highestWinningPercentageTeamEachSeasonPath);
}
main();

import deliveries from "../data/deliveries.json" assert { type: "json" };
import matches from "../data/matches.json" assert { type: "json" };
import { saveDataInFile } from "../utils/saveFileInJSON.js";
import { teamsTotalSixesEachSeasonPath } from "../utils/path.js";

export function getSixesEachSeason(deliveries) {
  if (!deliveries) {
    return {};
  }

  const eachSeasonIds = {};
  for (let match of matches) {
    const { id, season } = match;
    if (!eachSeasonIds[season]) {
      eachSeasonIds[season] = [id];
    } else {
      eachSeasonIds[season].push(id);
    }
  }

  const teamsTotalSixesEachSeason = {};

  for (let season in eachSeasonIds) {
    const idSet = new Set(eachSeasonIds[season]);

    for (let matchDeliveries of deliveries) {
      const { batting_team, batsman_runs, match_id } = matchDeliveries;
      if (!idSet.has(match_id)) {
        continue;
      }

      if (!teamsTotalSixesEachSeason[season]) {
        teamsTotalSixesEachSeason[season] = {};
      }

      if (parseInt(batsman_runs) === 6) {
        if (!teamsTotalSixesEachSeason[season][batting_team]) {
          teamsTotalSixesEachSeason[season][batting_team] = 1;
        } else if (teamsTotalSixesEachSeason[season][batting_team]) {
          teamsTotalSixesEachSeason[season][batting_team] += 1;
        }
      }
    }
  }

  return teamsTotalSixesEachSeason;
}

async function main() {
  const data = getSixesEachSeason(deliveries);
  saveDataInFile(data, teamsTotalSixesEachSeasonPath);
}

main();

import matches from "../data/matches.json" assert { type: "json" };
import deliveries from "../data/deliveries.json" assert { type: "json" };
import { mostHalfCenturiesBatsmanEachSeasonPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";
import { getSeasonIds } from "../utils/matchIdManager.js";

export function mostHalfCenturiesBatsmanEachSeason(deliveries, matches) {
  if (!deliveries || !matches) {
    return {};
  }

  const matchIds = getSeasonIds(matches);

  const seasonBatsmanStat = {};
  for (let seasons in matchIds) {
    const idSet = new Set(matchIds[seasons]);

    for (let matchDevlivery of deliveries) {
      const { match_id, batsman, batsman_runs } = matchDevlivery;

      if (!idSet.has(match_id)) {
        continue;
      }

      if (!seasonBatsmanStat[seasons]) {
        seasonBatsmanStat[seasons] = {};
      }

      if (!seasonBatsmanStat[seasons][batsman]) {
        seasonBatsmanStat[seasons][batsman] = {};
      }
      if (!seasonBatsmanStat[seasons][batsman][match_id]) {
        seasonBatsmanStat[seasons][batsman][match_id] = parseInt(batsman_runs);
      } else if (seasonBatsmanStat[seasons][batsman]) {
        seasonBatsmanStat[seasons][batsman][match_id] += parseInt(batsman_runs);
      }
    }
  }

  //   calculate half centuries

  for (let season in seasonBatsmanStat) {
    for (let batsman in seasonBatsmanStat[season]) {
      const matchRuns = seasonBatsmanStat[season][batsman];
      let halfCenturiesCount = 0;
      let maxHalfCenturies = 0;
      let maxHalfCenturiesBatsman = "";

      for (let matchId in matchRuns) {
        if (matchRuns[matchId] >= 50) {
          halfCenturiesCount++;
        }
      }

      seasonBatsmanStat[season][batsman] = halfCenturiesCount;
    }
  }

  // find most centuries batsman each season;

  for (let season in seasonBatsmanStat) {
    let maxHalfCenturies = 0;
    let maxHalfCenturiesBatsman = "";
    for (let batsman in seasonBatsmanStat[season]) {
      const halfCenturies = seasonBatsmanStat[season][batsman];
      if (halfCenturies > maxHalfCenturies) {
        maxHalfCenturies = halfCenturies;
        maxHalfCenturiesBatsman = batsman;
      }
    }

    seasonBatsmanStat[season] = {
      batsman: maxHalfCenturiesBatsman,
      halfCenturies: maxHalfCenturies,
    };
  }

  return seasonBatsmanStat;
}

function main() {
  const data = mostHalfCenturiesBatsmanEachSeason(deliveries, matches);
  saveDataInFile(data, mostHalfCenturiesBatsmanEachSeasonPath);
}
main();

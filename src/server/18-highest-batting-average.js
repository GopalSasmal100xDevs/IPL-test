import matches from "../data/matches.json" assert { type: "json" };
import deliveries from "../data/deliveries.json" assert { type: "json" };
import { bestBattingAverageBatsmanPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";
import { getSeasonIds } from "../utils/matchIdManager.js";

export function highestBattingAverage(matches, deliveries) {
  if (!matches || !deliveries) {
    return {};
  }

  const seasonsId = getSeasonIds(matches);
  const batterStats = {};

  for (let season in seasonsId) {
    const idSet = new Set(seasonsId[season]);

    // highest batting average

    for (let matchDelivery of deliveries) {
      const {
        match_id,
        batsman,
        batsman_runs,
        dismissal_kind,
        player_dismissed,
      } = matchDelivery;
      if (!idSet.has(match_id)) continue;

      if (!batterStats[season]) {
        batterStats[season] = {};
      }

      if (!batterStats[season][batsman]) {
        batterStats[season][batsman] = {};
      }

      if (!batterStats[season][batsman]["totalRuns"]) {
        batterStats[season][batsman]["totalRuns"] = parseInt(batsman_runs);
      } else if (batterStats[season][batsman]["totalRuns"]) {
        batterStats[season][batsman]["totalRuns"] += parseInt(batsman_runs);
      }

      if (dismissal_kind !== "" && batsman === player_dismissed) {
        if (!batterStats[season][batsman]["dismissalCount"]) {
          batterStats[season][batsman]["dismissalCount"] = 1;
        } else if (batterStats[season][batsman]["dismissalCount"]) {
          batterStats[season][batsman]["dismissalCount"] += 1;
        }
      }
    }
  }

  // calculate batting average
  for (let season in batterStats) {
    for (let batter in batterStats[season]) {
      const { totalRuns, dismissalCount } = batterStats[season][batter];
      if (dismissalCount) {
        const battingAverage = (totalRuns / dismissalCount).toFixed(2);
        batterStats[season][batter]["battingAverage"] = battingAverage;
      }
    }
  }
  // calculate best batting average

  for (let season in batterStats) {
    let bestBattingAverageBatsmanStat = {};
    let bestAverageBatsman = "";
    let maxBattingAverage = 0;
    for (let batsman in batterStats[season]) {
      const { battingAverage } = batterStats[season][batsman];
      if (battingAverage && maxBattingAverage < parseFloat(battingAverage)) {
        maxBattingAverage = parseFloat(battingAverage);
        bestAverageBatsman = batsman;
        bestBattingAverageBatsmanStat = batterStats[season][batsman];
      }
    }
    batterStats[season] = {
      batsman: bestAverageBatsman,
      battingAverage: maxBattingAverage,
      ...bestBattingAverageBatsmanStat,
    };
  }

  return batterStats;
}

function main() {
  const data = highestBattingAverage(matches, deliveries);
  saveDataInFile(data, bestBattingAverageBatsmanPath);
}

main();

import matches from "../data/matches.json" assert { type: "json" };
import deliveries from "../data/deliveries.json" assert { type: "json" };
import { batsmanStrikeRateEachSeasonPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";

export function getYearsIdSet(matches) {
  const years = {};

  for (let match of matches) {
    const { id, season } = match;
    if (years[season]) {
      years[season].add(id);
    } else {
      years[season] = new Set(id);
    }
  }

  return years;
}

export function batsmanStrikeRateEachSeason(matches, deliveries) {
  if (!matches) {
    return {};
  }

  const yearsIdSet = getYearsIdSet(matches);

  const batsmanInfo = {};

  for (let matchDelivery of deliveries) {
    const { match_id, batsman, batsman_runs } = matchDelivery;
    for (let year in yearsIdSet) {
      if (yearsIdSet[year].has(match_id)) {
        if (batsmanInfo[year]) {
          // year present
          if (batsmanInfo[year][batsman]) {
            // batsman present
            if (batsmanInfo[year][batsman]["totalRun"]) {
              // totalRun present , so increment count;
              batsmanInfo[year][batsman]["totalRun"] += Number(batsman_runs);
            } else {
              // totalRun not present, create
              batsmanInfo[year][batsman]["totalRun"] = Number(batsman_runs);
            }
            if (batsmanInfo[year][batsman]["ballPlayed"]) {
              // ballPlayed present, increate ball count
              batsmanInfo[year][batsman]["ballPlayed"] += 1;
            } else {
              // ballPlayed create
              batsmanInfo[year][batsman]["ballPlayed"] = 1;
            }
          } else {
            // batsman not present;
            batsmanInfo[year][batsman] = {};
            batsmanInfo[year][batsman]["ballPlayed"] = 1;
            batsmanInfo[year][batsman]["totalRun"] = Number(batsman_runs);
          }
        } else {
          // year not present
          batsmanInfo[year] = {};
          batsmanInfo[year][batsman] = {};
          batsmanInfo[year][batsman]["ballPlayed"] = 1;
          batsmanInfo[year][batsman]["totalRun"] = Number(batsman_runs);
        }
      }
    }
  }

  // strike rate count
  for (let year in batsmanInfo) {
    const allBatters = batsmanInfo[year];
    for (let name in allBatters) {
      const { ballPlayed, totalRun } = allBatters[name];
      allBatters[name]["strikeRate"] = ((totalRun / ballPlayed) * 100).toFixed(
        2
      );
    }
  }

  return batsmanInfo;
}

const data = batsmanStrikeRateEachSeason(matches, deliveries);
saveDataInFile(data, batsmanStrikeRateEachSeasonPath);

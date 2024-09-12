import deliveries from "../data/deliveries.json" assert { type: "json" };
import matches from "../data/matches.json" assert { type: "json" };
import { mostRunGetterBatsmanEachSeasonPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";

const temp = {
  match_id: "97",
  inning: "1",
  batting_team: "Kings XI Punjab",
  bowling_team: "Rajasthan Royals",
  over: "19",
  ball: "5",
  batsman: "SE Marsh",
  non_striker: "Yuvraj Singh",
  bowler: "MM Patel",
  is_super_over: "0",
  wide_runs: "0",
  bye_runs: "0",
  legbye_runs: "0",
  noball_runs: "0",
  penalty_runs: "0",
  batsman_runs: "1",
  extra_runs: "0",
  total_runs: "1",
  player_dismissed: "",
  dismissal_kind: "",
  fielder: "",
};

export function playerWithMostRunsEachSeason(deliveries, matches) {
  if (!deliveries || !matches) {
    return {};
  }

  const seasonIds = {};
  // find each season id's
  for (let match of matches) {
    const { id, season } = match;
    if (!seasonIds[season]) {
      seasonIds[season] = [id];
    } else {
      seasonIds[season].push(id);
    }
  }

  const playerRunsEachSeason = {};
  for (let season in seasonIds) {
    const idSet = new Set(seasonIds[season]);
    for (let matchDeliveries of deliveries) {
      const { match_id, batsman, batsman_runs } = matchDeliveries;
      if (!idSet.has(match_id)) {
        continue;
      }

      if (!playerRunsEachSeason[season]) {
        playerRunsEachSeason[season] = {};
      }

      if (!playerRunsEachSeason[season][batsman]) {
        playerRunsEachSeason[season][batsman] = parseInt(batsman_runs);
      } else if (playerRunsEachSeason[season][batsman]) {
        playerRunsEachSeason[season][batsman] += parseInt(batsman_runs);
      }
    }
  }
  // find most batter with most runs in each season;
  const mostRunGetterBatsman = {};

  for (let season in playerRunsEachSeason) {
    const allBatters = playerRunsEachSeason[season];

    let batter = "";
    let mostRuns = 0;
    for (let name in allBatters) {
      const runs = allBatters[name];
      if (mostRuns < parseInt(runs)) {
        mostRuns = parseInt(runs);
        batter = name;
      }
    }

    if (!mostRunGetterBatsman[season]) {
      mostRunGetterBatsman[season] = {};
    }

    if (!mostRunGetterBatsman[season][batter]) {
      mostRunGetterBatsman[season][batter] = mostRuns;
    }
  }

  return mostRunGetterBatsman;
}

function main() {
  const data = playerWithMostRunsEachSeason(deliveries, matches);
  saveDataInFile(data, mostRunGetterBatsmanEachSeasonPath);
}
main();

import deliveries from "../data/deliveries.json" assert { type: "json" };
import matches from "../data/matches.json" assert { type: "json" };
import { highestNetRunRateEachSeasonPath } from "../utils/path.js";
import { getSeasonIds } from "../utils/matchIdManager.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";

export function highestNetRunRateEachSeason(deliveries, matches) {
  if (!deliveries || !matches) {
    return {};
  }

  // find every season id's
  const seasonIds = getSeasonIds(matches);

  // calculate team runs and conceded runs

  const matchesStat = {};
  for (let season in seasonIds) {
    const idSet = new Set(seasonIds[season]);

    for (let matchDelivery of deliveries) {
      const {
        match_id,
        batting_team,
        bowling_team,
        total_runs,
        noball_runs,
        wide_runs,
      } = matchDelivery;

      if (!idSet.has(match_id)) {
        continue;
      }

      const isValidBall = noball_runs === "0" && wide_runs === "0";

      if (!matchesStat[season]) {
        matchesStat[season] = {};
      }

      if (!matchesStat[season][batting_team]) {
        matchesStat[season][batting_team] = {};
      }

      if (!matchesStat[season][bowling_team]) {
        matchesStat[season][bowling_team] = {};
      }

      // Total Ball Faced
      if (!matchesStat[season][batting_team]["ballFaced"]) {
        matchesStat[season][batting_team]["ballFaced"] = isValidBall ? 1 : 0;
      } else if (matchesStat[season][batting_team]["ballFaced"]) {
        matchesStat[season][batting_team]["ballFaced"] += isValidBall ? 1 : 0;
      }

      // Total Runs Scored

      if (!matchesStat[season][batting_team]["runScored"]) {
        matchesStat[season][batting_team]["runScored"] = parseInt(total_runs);
      } else if (matchesStat[season][batting_team]["runScored"]) {
        matchesStat[season][batting_team]["runScored"] += parseInt(total_runs);
      }

      // Total ball Bowled

      if (!matchesStat[season][bowling_team]["bowled"]) {
        matchesStat[season][bowling_team]["bowled"] = isValidBall ? 1 : 0;
      } else if (matchesStat[season][bowling_team]["bowled"]) {
        matchesStat[season][bowling_team]["bowled"] += isValidBall ? 1 : 0;
      }

      // Total Runs Conceded
      if (!matchesStat[season][bowling_team]["runConceded"]) {
        matchesStat[season][bowling_team]["runConceded"] = parseInt(total_runs);
      } else if (matchesStat[season][bowling_team]["runConceded"]) {
        matchesStat[season][bowling_team]["runConceded"] +=
          parseInt(total_runs);
      }
    }
  }

  // calculate net run rate
  for (let season in matchesStat) {
    for (let team in matchesStat[season]) {
      const { ballFaced, runScored, bowled, runConceded } =
        matchesStat[season][team];

      const netRunRate = (runScored / ballFaced - runConceded / bowled).toFixed(
        2
      );
      matchesStat[season][team]["netRunRate"] = netRunRate;
    }
  }

  // calculate highest net run rate

  for (let season in matchesStat) {
    let maxRunRateTeam = "";
    let maxRunRate = -1000;
    for (let team in matchesStat[season]) {
      const { netRunRate } = matchesStat[season][team];
      if (maxRunRate < parseFloat(netRunRate)) {
        maxRunRate = parseFloat(netRunRate);
        maxRunRateTeam = team;
      }
    }
    matchesStat[season] = { team: maxRunRateTeam, runRate: maxRunRate };
  }

  return matchesStat;
}

function main() {
  const data = highestNetRunRateEachSeason(deliveries, matches);
  saveDataInFile(data, highestNetRunRateEachSeasonPath);
}

main();

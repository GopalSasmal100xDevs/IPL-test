import matches from "../data/matches.json" assert { type: "json" };
import deliveries from "../data/deliveries.json" assert { type: "json" };
import {
  deliveriesJSONPath,
  toatlDotBallsEachSeasonPath,
} from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";
import { getSeasonIds } from "../utils/matchIdManager.js";

export function getTeamHighestTotal(matches, deliveries) {
  if (!matches || !deliveries) {
    return {};
  }
  const seasonIds = getSeasonIds(matches);

  const teamsHighestTotal = {};

  for (let season in seasonIds) {
    const idSet = new Set(seasonIds[season]);

    for (let matchDelivery of deliveries) {
      const { match_id, is_super_over, batting_team, total_runs } =
        matchDelivery;

      if (!idSet.has(match_id)) continue;

      if (is_super_over === "1") continue;

      if (!teamsHighestTotal[season]) {
        teamsHighestTotal[season] = {};
      }

      if (!teamsHighestTotal[season][batting_team]) {
        teamsHighestTotal[season][batting_team] = {};
      }
      if (!teamsHighestTotal[season][batting_team][match_id]) {
        teamsHighestTotal[season][batting_team][match_id] =
          parseInt(total_runs);
      } else if (teamsHighestTotal[season][batting_team][match_id]) {
        teamsHighestTotal[season][batting_team][match_id] +=
          parseInt(total_runs);
      }
    }
  }

  // calculate highest team total each season
  for (let season in teamsHighestTotal) {
    for (let team in teamsHighestTotal[season]) {
      let highestTotal = 0;
      for (let matchId in teamsHighestTotal[season][team]) {
        const total = teamsHighestTotal[season][team][matchId];
        if (total > highestTotal) {
          highestTotal = total;
        }
      }
      teamsHighestTotal[season][team] = highestTotal;
    }
  }

  // calculate highest total each season

  for (let season in teamsHighestTotal) {
    let highestTotal = 0;
    let highestTotalTeam = "";
    for (let team in teamsHighestTotal[season]) {
      const total = teamsHighestTotal[season][team];
      if (total > highestTotal) {
        highestTotal = total;
        highestTotalTeam = team;
      }
    }
    teamsHighestTotal[season] = {
      team: highestTotalTeam,
      total: highestTotal,
    };
  }

  return teamsHighestTotal;
}

const temp = {
  match_id: "3",
  inning: "1",
  batting_team: "Gujarat Lions",
  bowling_team: "Kolkata Knight Riders",
  over: "9",
  ball: "1",
  batsman: "BB McCullum",
  non_striker: "SK Raina",
  bowler: "Kuldeep Yadav",
  is_super_over: "0",
  wide_runs: "0",
  bye_runs: "0",
  legbye_runs: "0",
  noball_runs: "0",
  penalty_runs: "0",
  batsman_runs: "0",
  extra_runs: "0",
  total_runs: "0",
  player_dismissed: "BB McCullum",
  dismissal_kind: "lbw",
  fielder: "",
};

function main(matches, deliveries) {
  const data = getTeamHighestTotal(matches, deliveries);
  console.log(data);
}

main(matches, deliveries);

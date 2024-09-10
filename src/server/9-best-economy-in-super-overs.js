import deliveries from "../data/deliveries.json" assert { type: "json" };
import { bestEconomyInSuperOversPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";

const temp = {
  match_id: "34",
  inning: "3",
  batting_team: "Mumbai Indians",
  bowling_team: "Gujarat Lions",
  over: "1",
  ball: "1",
  batsman: "JC Buttler",
  non_striker: "KA Pollard",
  bowler: "JP Faulkner",
  is_super_over: "1",
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

export function bestEconomyInSuperOvers(deliveries) {
  if (!deliveries) {
    return {};
  }

  const superOverBowlers = {};

  for (let matchDelivery of deliveries) {
    const { is_super_over, bowler, total_runs } = matchDelivery;

    if (Number(is_super_over) == 1) {
      if (superOverBowlers[bowler]) {
        // bowler already present, so increament count;
        superOverBowlers[bowler]["ballCount"] += 1;
        superOverBowlers[bowler]["runs"] += Number(total_runs);
      } else {
        superOverBowlers[bowler] = {};
        superOverBowlers[bowler]["ballCount"] = 1;
        superOverBowlers[bowler]["runs"] = Number(total_runs);
      }
    }
  }

  //   Calculate bowler economy
  for (let bowler in superOverBowlers) {
    const { ballCount, runs } = superOverBowlers[bowler];
    superOverBowlers[bowler]["economy"] = (runs / (ballCount / 6)).toFixed(2);
  }

  // finding top bowlers by thier economy
  const bowlers = Object.entries(superOverBowlers);
  bowlers.sort((a, b) => {
    return Number.parseFloat(a[1].economy) - Number.parseFloat(b[1].economy);
  });
  return { [bowlers[0][0]]: bowlers[0][1] };
}

const data = bestEconomyInSuperOvers(deliveries);
saveDataInFile(data, bestEconomyInSuperOversPath);

import deliveries from "../data/deliveries.json" assert { type: "json" };
import matches from "../data/matches.json" assert { type: "json" };
import { getMatchesIds } from "../utils/index.js";
import { top10EconomicalBowlersIn2015Path } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";

export function calculateEconomy(bowlers) {
  if (!bowlers) return {};

  for (let bowler in bowlers) {
    const { balls, concededRun } = bowlers[bowler];
    if (bowlers[bowler]) {
      bowlers[bowler]["economy"] = (concededRun / (balls / 6)).toFixed(2);
    }
  }
  return bowlers;
}

export function top10EconomicalBowlersIn2015(deliveries, matches) {
  const bowlers = {};

  const matchesIds = getMatchesIds(matches, 2015);
  const idSet = new Set(matchesIds);

  for (let matchDelivery of deliveries) {
    const { match_id, bowler, total_runs } = matchDelivery;
    if (idSet.has(match_id)) {
      if (bowlers[bowler]) {
        bowlers[bowler]["balls"] += 1;
        bowlers[bowler]["concededRun"] += Number.parseInt(total_runs);
      } else {
        bowlers[bowler] = {};
        bowlers[bowler]["balls"] = 1;
        bowlers[bowler]["concededRun"] = Number.parseInt(total_runs);
      }
    }
  }

  // Calculate economy for bowlers
  const allBowlers = calculateEconomy(bowlers);
  // Top 10 economical bowlers
  const top10EconomicalBowlersArray = Object.entries(allBowlers)
    .sort((a, b) => {
      return (
        Number.parseFloat(a[1]["economy"]) - Number.parseFloat(b[1]["economy"])
      );
    })
    .slice(0, 10);
  const top10EconomicalBowlers = {};
  top10EconomicalBowlersArray.forEach((playerInfo) => {
    const [playerName, playerStat] = playerInfo;
    top10EconomicalBowlers[playerName] = playerStat;
  });
  return top10EconomicalBowlers;
}

const data = top10EconomicalBowlersIn2015(deliveries, matches);
saveDataInFile(data, top10EconomicalBowlersIn2015Path);

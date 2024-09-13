import matches from "../data/matches.json" assert { type: "json" };
import deliveries from "../data/deliveries.json" assert { type: "json" };
import { toatlDotBallsEachSeasonPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";
import { getSeasonIds } from "../utils/matchIdManager.js";

export function getTotalDotBallsByBowlers(matches, deliveries) {
  if (!matches || !deliveries) {
    return {};
  }

  const seasonIds = getSeasonIds(matches);

  const dotBallsStats = {};

  for (let season in seasonIds) {
    const idSet = new Set(seasonIds[season]);

    for (let matchDelivery of deliveries) {
      const {
        match_id,
        bowler,
        wide_runs,
        noball_runs,
        player_dismissed,
        extra_runs,
        total_runs,
      } = matchDelivery;

      if (!idSet.has(match_id)) {
        continue;
      }

      const isValidBall = wide_runs === "" && noball_runs === "";
      const anyWicket = player_dismissed === "";
      const anyRuns = extra_runs === "" && total_runs === "";

      if (isValidBall || anyRuns || anyWicket) {
        continue;
      }

      if (!dotBallsStats[season]) {
        dotBallsStats[season] = {};
      }

      if (!dotBallsStats[season][bowler]) {
        dotBallsStats[season][bowler] = 1;
      } else if (dotBallsStats[season][bowler]) {
        dotBallsStats[season][bowler] += 1;
      }
    }
  }
  return dotBallsStats;
}

function main() {
  const data = getTotalDotBallsByBowlers(matches, deliveries);
  saveDataInFile(data, toatlDotBallsEachSeasonPath);
}
main();

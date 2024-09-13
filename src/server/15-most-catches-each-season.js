import matches from "../data/matches.json" assert { type: "json" };
import deliveries from "../data/deliveries.json" assert { type: "json" };
import { mostCatchesEachSeasonPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";
import { getSeasonIds } from "../utils/matchIdManager.js";

export function mostCatchesEachSeason(deliveries, matches) {
  if (!deliveries || !matches) {
    return {};
  }

  const seasonIds = getSeasonIds(matches);
  const mostCatches = {};

  for (let season in seasonIds) {
    const ids = seasonIds[season];
    const idSet = new Set(ids);

    for (let matchDevlivery of deliveries) {
      const { match_id, dismissal_kind, fielder } = matchDevlivery;

      if (!idSet.has(match_id)) {
        continue;
      }

      if (!mostCatches[season]) {
        mostCatches[season] = {};
      }

      if (fielder && !mostCatches[season][fielder]) {
        mostCatches[season][fielder] = dismissal_kind === "caught" ? 1 : 0;
      } else if (fielder && mostCatches[season][fielder]) {
        mostCatches[season][fielder] += dismissal_kind === "caught" ? 1 : 0;
      }
    }
  }

  //   most catches each season
  for (let season in mostCatches) {
    let mostCatchesCount = 0;
    let mostCatchesTaker = 0;

    for (let player in mostCatches[season]) {
      const catches = mostCatches[season][player];
      if (catches > mostCatchesCount) {
        mostCatchesCount = catches;
        mostCatchesTaker = player;
      }
    }
    mostCatches[season] = {
      player: mostCatchesTaker,
      catches: mostCatchesCount,
    };
  }

  return mostCatches;
}

function main() {
  const data = mostCatchesEachSeason(deliveries, matches);
  saveDataInFile(data, mostCatchesEachSeasonPath);
}
main();

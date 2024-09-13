import matches from "../data/matches.json" assert { type: "json" };
import deliveries from "../data/deliveries.json" assert { type: "json" };
import { mostWicketTakerInDeathOverPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";
import { getSeasonIds } from "../utils/matchIdManager.js";

export function getMostWicketTakerInDeathOver(matches, deliveries) {
  if (!deliveries || !matches) {
    return {};
  }

  const seasonIds = getSeasonIds(matches);

  const mostWicketTakerInDeathOver = {};
  for (let season in seasonIds) {
    const idSet = new Set(seasonIds[season]);

    // calculate wickets
    for (let matchDelivery of deliveries) {
      const { match_id, player_dismissed, is_super_over, bowler } =
        matchDelivery;
      if (!idSet.has(match_id)) {
        continue;
      }

      if (parseInt(is_super_over) === 0) {
        continue;
      }

      if (!mostWicketTakerInDeathOver[season]) {
        mostWicketTakerInDeathOver[season] = {};
      }

      if (!mostWicketTakerInDeathOver[season][bowler]) {
        mostWicketTakerInDeathOver[season][bowler] =
          player_dismissed !== "" ? 1 : 0;
      } else {
        mostWicketTakerInDeathOver[season][bowler] +=
          player_dismissed !== "" ? 1 : 0;
      }
    }
  }

  // most wicket taker in death over each season

  for (let season in mostWicketTakerInDeathOver) {
    const players = mostWicketTakerInDeathOver[season];

    let bowler = "";
    let mostWicketInDeathOver = 0;
    for (let player in players) {
      if (mostWicketInDeathOver < players[player]) {
        mostWicketInDeathOver = players[player];
        bowler = player;
      }
    }
    if (mostWicketInDeathOver > 0) {
      mostWicketTakerInDeathOver[season] = {
        bowler,
        wicket: mostWicketInDeathOver,
      };
    }
  }

  return mostWicketTakerInDeathOver;
}

function main() {
  const data = getMostWicketTakerInDeathOver(matches, deliveries);
  saveDataInFile(data, mostWicketTakerInDeathOverPath);
}

main();

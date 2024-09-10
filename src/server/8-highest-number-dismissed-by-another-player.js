import deliveries from "../data/deliveries.json" assert { type: "json" };
import { highestNumberDismissedByAnotherPlayerPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";

export function highestNumberDismissedByAnotherPlayer(deliveries) {
  if (!deliveries) {
    return {};
  }

  const maxDismissedPlayers = {};
  for (let matchDelivery of deliveries) {
    const { player_dismissed, bowler, dismissal_kind } = matchDelivery;

    if (dismissal_kind && dismissal_kind !== "run out") {
      if (maxDismissedPlayers[player_dismissed]) {
        if (maxDismissedPlayers[player_dismissed][bowler]) {
          maxDismissedPlayers[player_dismissed][bowler] += 1;
        } else {
          maxDismissedPlayers[player_dismissed][bowler] = 1;
        }
      } else {
        maxDismissedPlayers[player_dismissed] = {};
        maxDismissedPlayers[player_dismissed][bowler] = 1;
      }
    }
  }

  //   find most dismissed player
  let maxDismissalsCount = 0;
  let maxDismissalsBowlers = [];
  let maxDismissedBatter = null;

  for (let batsman in maxDismissedPlayers) {
    for (let bowler in maxDismissedPlayers[batsman]) {
      const currentDismissals = maxDismissedPlayers[batsman][bowler];
      if (maxDismissalsCount < currentDismissals) {
        maxDismissalsCount = currentDismissals;
        maxDismissedBatter = batsman;
        maxDismissalsBowlers = [bowler];
      }
    }
  }

  return {
    batsman: maxDismissedBatter,
    maxDismissals: maxDismissalsCount,
    maxDismissedBy: maxDismissalsBowlers,
  };
}

const data = highestNumberDismissedByAnotherPlayer(deliveries);
saveDataInFile(data, highestNumberDismissedByAnotherPlayerPath);

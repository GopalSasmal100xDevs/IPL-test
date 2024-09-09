import matches from "../data/matches.json" assert { type: "json" };
import { teamsWonTossWonMatchPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";

export function teamsWonTossWonMatch(matches) {
  if (!matches) return {};

  const tossWinnerAndMatchWinner = {};
  matches.forEach((match) => {
    const { toss_winner, winner } = match;
    if (toss_winner === winner) {
      if (tossWinnerAndMatchWinner[winner]) {
        tossWinnerAndMatchWinner[winner] += 1;
      } else {
        tossWinnerAndMatchWinner[winner] = 1;
      }
    }
  });
  return tossWinnerAndMatchWinner;
}

const data = teamsWonTossWonMatch(matches);
saveDataInFile(data, teamsWonTossWonMatchPath);

import matches from "../data/matches.json" assert { type: "json" };
import deliveries from "../data/deliveries.json" assert { type: "json" };
import { teamPlayedMostSuperOverPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";
import { getSeasonIds } from "../utils/matchIdManager.js";

export function getTeamsMostSuperOvers(matches, deliveries) {
  if (!matches || !deliveries) {
    return {};
  }

  const idSet = new Set();

  const teamsMostSuperOversCount = {};

  for (let matchDelivery of deliveries) {
    const { match_id, is_super_over, batting_team, bowling_team } =
      matchDelivery;

    if (idSet.has(match_id)) {
      continue;
    }

    if (is_super_over !== "1") {
      continue;
    }

    teamsMostSuperOversCount[batting_team] =
      (teamsMostSuperOversCount[batting_team] || 0) + 1;

    teamsMostSuperOversCount[bowling_team] =
      (teamsMostSuperOversCount[bowling_team] || 0) + 1;
    idSet.add(match_id);
  }

  let superOverCount = 0;
  let mostSuperOverTeam = "";
  for (let team in teamsMostSuperOversCount) {
    if (teamsMostSuperOversCount[team] > superOverCount) {
      superOverCount = teamsMostSuperOversCount[team];
      mostSuperOverTeam = team;
    }
  }

  return {
    team: mostSuperOverTeam,
    superOver: superOverCount,
  };
}

function main() {
  const data = getTeamsMostSuperOvers(matches, deliveries);
  saveDataInFile(data, teamPlayedMostSuperOverPath);
}
main();

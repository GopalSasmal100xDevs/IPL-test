import deliveries from "../data/deliveries.json" assert { type: "json" };
import matches from "../data/matches.json" assert { type: "json" };
import { extraRunsConcededPerTeamIn2016Path } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";

export function get2016MatchesIds(matches) {
  const result = [];
  matches.forEach((match) => {
    const { id, season } = match;
    if (season === "2016") {
      result.push(id);
    }
  });
  return result;
}

export function extraRunConcededPerTeamIn2016(deliveries) {
  const extraRunsIn2016 = {};
  const matchesIds = get2016MatchesIds(matches);
  const matchesIdSet = new Set(matchesIds);

  deliveries.forEach((deliver) => {
    const { match_id, extra_runs, bowling_team } = deliver;
    if (matchesIdSet.has(match_id)) {
      if (extraRunsIn2016[bowling_team]) {
        extraRunsIn2016[bowling_team] += Number.parseInt(extra_runs);
      } else {
        extraRunsIn2016[bowling_team] = Number.parseInt(extra_runs);
      }
    }
  });

  return extraRunsIn2016;
}

const data = extraRunConcededPerTeamIn2016(deliveries);
saveDataInFile(data, extraRunsConcededPerTeamIn2016Path);

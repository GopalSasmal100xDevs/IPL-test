import matches from "../data/matches.json" assert { type: "json" };
import { teamLostMostMatchesPath } from "../utils/path.js";
import { saveDataInFile } from "../utils/saveFileInJSON.js";
import { getSeasonIds } from "../utils/matchIdManager.js";

const temp = {
  id: "64",
  season: "2008",
  city: "Kolkata",
  date: "2008-04-20",
  team1: "Deccan Chargers",
  team2: "Kolkata Knight Riders",
  toss_winner: "Deccan Chargers",
  toss_decision: "bat",
  result: "normal",
  dl_applied: "0",
  winner: "Kolkata Knight Riders",
  win_by_runs: "0",
  win_by_wickets: "5",
  player_of_match: "DJ Hussey",
  venue: "Eden Gardens",
  umpire1: "BF Bowden",
  umpire2: "K Hariharan",
  umpire3: "",
};

export function getTeamLostMostMatches(matches) {
  if (!matches) {
    return {};
  }

  const teamsLostMatchesCount = {};
  // Calculate lost matches
  for (let match of matches) {
    const { season, result, winner, team1, team2 } = match;

    if (!teamsLostMatchesCount[season]) {
      teamsLostMatchesCount[season] = {};
    }

    const lostTeam = winner === team1 ? team2 : team1;
    if (!teamsLostMatchesCount[season][lostTeam]) {
      teamsLostMatchesCount[season][lostTeam] = 1;
    } else if (teamsLostMatchesCount[season][lostTeam]) {
      teamsLostMatchesCount[season][lostTeam] += 1;
    }
  }

  // calculate most match lost
  for (let season in teamsLostMatchesCount) {
    let mostLostTeam = "";
    let mostLostTeamCount = 0;
    for (let team in teamsLostMatchesCount[season]) {
      const lostCount = teamsLostMatchesCount[season][team];

      if (lostCount > mostLostTeamCount) {
        mostLostTeamCount = lostCount;
        mostLostTeam = team;
      }
    }
    teamsLostMatchesCount[season] = {
      team: mostLostTeam,
      lostCount: mostLostTeamCount,
    };
  }

  return teamsLostMatchesCount;
}

function main(matches) {
  const data = getTeamLostMostMatches(matches);
  saveDataInFile(data, teamLostMostMatchesPath);
}

main(matches);

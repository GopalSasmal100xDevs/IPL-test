export function getMatchesIds(matches, year) {
  const result = [];
  matches.forEach((match) => {
    const { season, id } = match;
    if (Number.parseInt(season) === year) {
      return result.push(id);
    }
  });
  return result;
}

export function getSeasonIds(matches) {
  const ids = {};
  for (let match of matches) {
    const { id, season } = match;

    if (!ids[season]) {
      ids[season] = [id];
    } else {
      ids[season].push(id);
    }
  }

  return ids;
}

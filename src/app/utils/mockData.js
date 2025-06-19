
export const calculatePoints = (solvedC) => {
  let points = 0;
  const pointsMap = {
    easy: 2,
    medium: 7,
    hard: 20,
  };
  if (solvedC && typeof solvedC === "object") {
    if (solvedC.easy !== undefined) {
      points = points + solvedC.easy * pointsMap.easy;
    }
    if (solvedC.medium !== undefined) {
      points = points + solvedC.medium * pointsMap.medium;
    }
    if (solvedC.hard !== undefined) {
      points = points + solvedC.hard * pointsMap.hard;
    }
  }
  return points;
};

export const allEqual = (arr) =>
  arr.every((item) => {
    if (arr[0].type !== undefined) {
      return item.type === arr[0].type;
    } else {
      return false;
    }
  });

export const updatePoints = (winningType, points) => {
  let pointsCopy = points;
  switch (winningType) {
    case "oval":
      pointsCopy.cross += 1;
      return pointsCopy;
    case "cross":
      pointsCopy.oval += 1;
      return pointsCopy;
    default:
      pointsCopy.ties += 1;

      return pointsCopy;
  }
};

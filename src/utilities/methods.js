export const allEqual = (arr) =>
  arr.every((item) => {
    if (arr[0].type !== undefined) {
      return item.type === arr[0].type;
    } else {
      return false;
    }
  });

export const updatePoints = (type, points) => {
  let pointsCopy = points;
  switch (type) {
    case "ties":
      pointsCopy.ties += 1;
      return pointsCopy;
    case "user":
      pointsCopy.user += 1;
      return pointsCopy;
    case "cpu":
      pointsCopy.cpu += 1;
      return pointsCopy;

    default:
      break;
  }
};

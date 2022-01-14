export const allEqual = (arr) =>
  arr.every((item) => {
    if (arr[0].type !== undefined) {
      return item.type === arr[0].type;
    } else {
      return false;
    }
  });

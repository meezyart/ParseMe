/* splitArray(textArry, delimiter) - Splits an Array by Delimiter and trims whitespace
 * arr: Array to be sorted
 * type: String
 * usage: exp: splitArray(arr, ",");
 */
const splitArray = (textArry, delimiter) => {
  return textArry.map(val => {
    return val
      .split(delimiter)
      .map(Function.prototype.call, String.prototype.trim);
  });
};

module.exports = splitArray;
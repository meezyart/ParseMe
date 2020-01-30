
/*
 * convertDelimiter(name) - Converts Name to Delimiter
 */
function convertDelimiter(name) {
  if (!name) throw new Error("Please add a name");
  switch (name) {
    case "comma":
      return ",";
      break;
    case "space":
      return " ";
      break;
    case "pipe":
      return "|";
      break;
    default:
      throw new Error("Please add correct delimiter");
  }
}

module.exports = convertDelimiter;
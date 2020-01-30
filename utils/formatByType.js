
/* formatByType(objArray, type) - Sorts a Person by a certain Type
 * arr: Array to be sorted
 * type: String
 * Person: Object
 * usage: formatByType(comma, "comma");
 */
const formatByType = (objArray, type, Person) => {
  // Loop through array
  return objArray.reduce((acc, arr) => {
    switch (type) {
      case "comma":
        // comma format
        //"Abercrombie, Neil, Male, Tan, 2/13/1943",
        // new Person('firstName','MiddleInitial','LastName','gender','dob',favoriteColor)
        acc.push(
          new Person(arr[1], "", arr[0], arr[2], arr[4], arr[3]).formatMe()
        );
        return acc;
        break;
      case "space":
        // space format
        //"Kournikova (0) Anna (1) F (2)  F (3) 6-3-1975  (4) Red (5)",
        // new Person('firstName','MiddleInitial','LastName','gender','dob',favoriteColor)
        acc.push(
          new Person(arr[1], arr[2], arr[0], arr[3], arr[4], arr[5]).formatMe(
            (euro = true)
          )
        );
        return acc;
        break;
      case "pipe":
        // space format
        // "Bouillon | Francis | G | M | Blue | 6-3-1975"
        // new Person('firstName','MiddleInitial','LastName','gender','dob',favoriteColor)
        const person = new Person(
          arr[1], // firstName
          arr[2], // MiddleInitial
          arr[0], // LastName
          arr[3], // gender
          arr[5], // dob
          arr[4] // favoriteColor
        ).formatMe();
        acc.push(person);
        return acc;
        break;
      default:
        throw new Error(
          'Please supply the date format type in string\n exp:"pipe"'
        );
    }
  }, []);
};

module.exports = formatByType;
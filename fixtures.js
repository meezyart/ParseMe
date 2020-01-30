// fixtures
const spaceTxt = [
  "Kournikova Anna F F 6-3-1975 Red",
  "Hingis Martina M F 4-2-1979 Green",
  "Seles Monica H F 12-2-1973 Black"
];

const commaTxt = [
  "Bishop, Timothy, Male, Yellow, 4/23/1967",
  "Kelly, Sue, Female, Pink, 7/12/1959",
  "Abercrombie   , Neil, Male  , Tan, 2/13/1943"
];

const pipeTxt = [
  "Smith | Steve | D | M | Red | 3-3-1985",
  "Bonk | Radek | S | M | Green | 6-3-1975",
  "Bouillon | Francis | G | M | Blue | 6-3-1975"
];

const mockCombined = [
  {
    lastName: "Kournikova",
    firstName: "Anna",
    gender: "Female",
    dob: "3/6/1975",
    favoriteColor: "Red",
    middleInitial: "F"
  },
  {
    lastName: "Hingis",
    firstName: "Martina",
    gender: "Female",
    dob: "2/4/1979",
    favoriteColor: "Green",
    middleInitial: "M"
  },
  {
    lastName: "Seles",
    firstName: "Monica",
    gender: "Female",
    dob: "2/12/1973",
    favoriteColor: "Black",
    middleInitial: "H"
  },
  {
    lastName: "Abercrombie",
    firstName: "Neil",
    gender: "Male",
    dob: "2/13/1943",
    favoriteColor: "Tan",
    middleInitial: ""
  },
  {
    lastName: "Bishop",
    firstName: "Timothy",
    gender: "Male",
    dob: "4/23/1967",
    favoriteColor: "Yellow",
    middleInitial: ""
  },
  {
    lastName: "Kelly",
    firstName: "Sue",
    gender: "Female",
    dob: "7/12/1959",
    favoriteColor: "Pink",
    middleInitial: ""
  },
  {
    lastName: "Smith",
    firstName: "Steve",
    gender: "Male",
    dob: "3/3/1985",
    favoriteColor: "Red",
    middleInitial: "D"
  },
  {
    lastName: "Bonk",
    firstName: "Radek",
    gender: "Male",
    dob: "6/3/1975",
    favoriteColor: "Green",
    middleInitial: "S"
  },
  {
    lastName: "Bouillon",
    firstName: "Francis",
    gender: "Male",
    dob: "6/3/1975",
    favoriteColor: "Blue",
    middleInitial: "G"
  }
];

module.exports = {
  spaceTxt,
  commaTxt,
  pipeTxt,
  mockCombined
};

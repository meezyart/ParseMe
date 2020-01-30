const {
  getFilesFromText,
  displayResults,
  directoryPath
} = require("../script");

const Person = require("../Person");
const {
  convertDelimiter,
  formatByType,
  splitArray,
  sortByProperty
} = require("../utils");
const { spaceTxt, commaTxt, pipeTxt, mockCombined } = require("../fixtures");

//  getFilesFromText Test
describe("Should get files from getFilesFromText", () => {
  it("Test The Callback function returning data", done => {
    function callback(data) {
      expect.assertions(3);
      expect(data).toHaveLength(9);
      expect(data[2]).toHaveProperty("dob");
      expect(data[0]).toHaveProperty("firstName");
      done();
    }
    getFilesFromText(directoryPath, callback);
  });
});

// Person Class Test
describe("Person Test", () => {
  let { meezy, neil, steve, sue } = "";
  beforeEach(() => {
    meezy = new Person("Gamaliel", "D", "James", "m", "16 12 1975", "Green");
    neil = new Person("Neil", "", "Abercrombie", "Male", "2/13/1943", "Tan");
    steve = new Person("Steve", "D", "Smith", "M", "3-4-1985", "Red");
    sue = new Person("Kelly", "D", "Sue", "F", "12-2-1973", "Yellow");
  });
  afterEach(() => {
    meezy = "";
    neil = "";
    steve = "";
    sue = "";
  });

  it("Should Match the Person Snapshot", () => {
    expect(meezy).toMatchSnapshot();
    expect(new Person()).toMatchSnapshot();
  });
  it("Should Create a new person", () => {
    expect(meezy).toBeInstanceOf(Person);
    expect(meezy).toHaveProperty("lastName");
    expect(meezy).toMatchObject({
      lastName: "James",
      firstName: "Gamaliel",
      gender: "m",
      dob: "16 12 1975",
      favoriteColor: "Green",
      middleInitial: "D"
    });
  });
  it("Should create a blank new person", () => {
    expect(new Person()).toMatchObject({
      lastName: "",
      firstName: "",
      gender: "",
      dob: "",
      favoriteColor: "",
      middleInitial: ""
    });
  });
  //  test the internal functions of the person
  describe("Person Functions Test", () => {
    it("Should format the date on the Person", () => {
      expect(meezy.dob).toBe("16 12 1975");
      expect(meezy.formatDate()).toBe("16/12/1975");
      expect(meezy.dob).toBe("16/12/1975");
      expect(neil.formatDate()).toBe("2/13/1943");
      expect(steve.formatDate()).toBe("3/4/1985");
      expect(sue.formatDate()).toBe("12/2/1973");
    });
    it("Should format the date in euro Style on the Person", () => {
      meezy.formatDate(true);
      expect(meezy).toMatchObject({ dob: "12/16/1975" });
      neil.formatDate(true);
      expect(neil).toMatchObject({ dob: "13/2/1943" });
      steve.formatDate(true);
      expect(steve).toMatchObject({ dob: "4/3/1985" });
      sue.formatDate(true);
      expect(sue).toMatchObject({ dob: "2/12/1973" });
    });
    it("Should format the Gender on the Person", () => {
      meezy.formatGender();
      expect(meezy).toMatchObject({ gender: "Male" });
      neil.formatGender();
      expect(neil).toMatchObject({ gender: "Male" });
      steve.formatGender();
      expect(steve).toMatchObject({ gender: "Male" });
      sue.formatGender();
      expect(sue).toMatchObject({ gender: "Female" });
    });
    it("Should add the Gender on the Person", () => {
      meezy.formatGender("They");
      expect(meezy).toMatchObject({ gender: "They" });
      neil.formatGender("Female");
      expect(neil).toMatchObject({ gender: "Female" });
      steve.formatGender("They");
      expect(steve).toMatchObject({ gender: "They" });
      sue.formatGender("It");
      expect(sue).toMatchObject({ gender: "It" });
    });
    it("Should format the Whole Person", () => {
      expect(meezy.formatMe(true)).toEqual({
        dob: "12/16/1975",
        favoriteColor: "Green",
        firstName: "Gamaliel",
        gender: "Male",
        lastName: "James",
        middleInitial: "D"
      });
      expect(neil).toMatchObject({ dob: "2/13/1943" });
      neil.formatMe();
      expect(neil).toMatchObject({ dob: "2/13/1943" });
      expect(steve.formatMe()).toMatchObject({ dob: "3/4/1985" });
      expect(sue.formatMe()).toMatchObject({ dob: "12/2/1973" });
    });
  });
});

// SplitArray Test
describe("Split Array Function Test", () => {
  let { spaceArr, commaArr, pipeArr } = "";
  beforeEach(() => {
    spaceArr = splitArray(spaceTxt, " ");
    commaArr = splitArray(commaTxt, ",");
    pipeArr = splitArray(pipeTxt, "|");
  });
  it("Should split by comma", () => {
    expect(commaArr.length).toBe(3);
    expect(commaArr[0]).toEqual([
      "Bishop",
      "Timothy",
      "Male",
      "Yellow",
      "4/23/1967"
    ]);
  });
  it("Should split by space", () => {
    expect(spaceArr.length).toBe(3);
    expect(spaceArr[0]).toEqual([
      "Kournikova",
      "Anna",
      "F",
      "F",
      "6-3-1975",
      "Red"
    ]);
  });
  it("Should split by pipe", () => {
    expect(pipeArr.length).toBe(3);
    expect(pipeArr[0]).toEqual(["Smith", "Steve", "D", "M", "Red", "3-3-1985"]);
  });
});

// Convert Delimiter
describe("ConvertDelimiter Array", () => {
  it("Should return a comma", () => {
    expect(convertDelimiter("comma")).toBe(",");
  });
  it("Should return a space", () => {
    expect(convertDelimiter("space")).toBe(" ");
  });
  it("Should return a pipe", () => {
    expect(convertDelimiter("pipe")).toBe("|");
  });
});

// Format By Type Test
describe("Format By Type Function Test", () => {
  let {
    spaceArr,
    commaArr,
    pipeArr,
    commaFormated,
    spaceFormated,
    pipeFormated
  } = "";
  beforeEach(() => {
    spaceArr = splitArray(spaceTxt, " ");
    commaArr = splitArray(commaTxt, ",");
    pipeArr = splitArray(pipeTxt, "|");
    commaFormated = formatByType(commaArr, "comma", Person);
    spaceFormated = formatByType(spaceArr, "space", Person);
    pipeFormated = formatByType(pipeArr, "pipe", Person);
  });
  it("Should format by comma", () => {
    expect(commaFormated).toHaveLength(3);
    expect(commaFormated[1]).toMatchObject({ middleInitial: "" });
    expect(commaFormated[0]).toEqual({
      dob: "4/23/1967",
      favoriteColor: "Yellow",
      firstName: "Timothy",
      gender: "Male",
      lastName: "Bishop",
      middleInitial: ""
    });
    expect("hello").toBe("hello");
  });
  it("Should format by space", () => {
    expect(spaceFormated).toHaveLength(3);
    expect(spaceFormated[0]).toEqual({
      lastName: "Kournikova",
      firstName: "Anna",
      gender: "Female",
      dob: "3/6/1975",
      favoriteColor: "Red",
      middleInitial: "F"
    });
  });
  it("Should format by pipe", () => {
    expect(pipeFormated).toHaveLength(3);
    expect(pipeFormated[0]).toEqual({
      lastName: "Smith",
      firstName: "Steve",
      gender: "Male",
      dob: "3/3/1985",
      favoriteColor: "Red",
      middleInitial: "D"
    });
  });
});

// Sort By Property Test
describe("Sort By Property Function Test", () => {
  let {
    spaceArr,
    commaArr,
    pipeArr,
    commaFormated,
    spaceFormated,
    pipeFormated,
    combined
  } = "";
  beforeEach(() => {
    spaceArr = splitArray(spaceTxt, " ");
    commaArr = splitArray(commaTxt, ",");
    pipeArr = splitArray(pipeTxt, "|");
    commaFormated = formatByType(commaArr, "comma", Person);
    spaceFormated = formatByType(spaceArr, "space", Person);
    pipeFormated = formatByType(pipeArr, "pipe", Person);
    combined = [...spaceFormated, ...commaFormated, ...pipeFormated];
  });
  afterEach(() => {
    spaceArr = splitArray(spaceTxt, " ");
    commaArr = splitArray(commaTxt, ",");
    pipeArr = splitArray(pipeTxt, "|");
    commaFormated = formatByType(commaArr, "comma", Person);
    spaceFormated = formatByType(spaceArr, "space", Person);
    pipeFormated = formatByType(pipeArr, "pipe", Person);
    combined = [...spaceFormated, ...commaFormated, ...pipeFormated];
  });

  it("Should sort commaFormated lastName  descending", () => {
    let sortByProps = [
      {
        prop: "dob",
        direction: -1
      }
    ];
    sortByProperty(commaFormated, sortByProps);
    expect(commaFormated).toHaveLength(3);
    // test the first and last entity in the Array
    expect(commaFormated[2]).toEqual({
      lastName: "Abercrombie",
      firstName: "Neil",
      gender: "Male",
      dob: "2/13/1943",
      favoriteColor: "Tan",
      middleInitial: ""
    });
    expect(commaFormated[0]).toEqual({
      lastName: "Bishop",
      firstName: "Timothy",
      gender: "Male",
      dob: "4/23/1967",
      favoriteColor: "Yellow",
      middleInitial: ""
    });
  });
  it("Should sort commaFormated lastNme then dob ascending", () => {
    let sortByProps = [
      {
        prop: "dob",
        direction: 1
      }
    ];
    sortByProperty(commaFormated, sortByProps);
    expect(commaFormated).toHaveLength(3);
    // test the first and last entity in the Array
    expect(commaFormated[0]).toEqual({
      lastName: "Abercrombie",
      firstName: "Neil",
      gender: "Male",
      dob: "2/13/1943",
      favoriteColor: "Tan",
      middleInitial: ""
    });
    expect(commaFormated[2]).toEqual({
      lastName: "Bishop",
      firstName: "Timothy",
      gender: "Male",
      dob: "4/23/1967",
      favoriteColor: "Yellow",
      middleInitial: ""
    });
  });
  it("Should sort spaceFormated LastName descending", () => {
    let sortByProps = [
      {
        prop: "lastName",
        direction: -1
      }
    ];
    sortByProperty(spaceFormated, sortByProps);
    expect(spaceFormated).toHaveLength(3);
    // test the first and last entity in the Array
    expect(spaceFormated[2]).toEqual({
      lastName: "Hingis",
      firstName: "Martina",
      gender: "Female",
      dob: "2/4/1979",
      favoriteColor: "Green",
      middleInitial: "M"
    });
    expect(spaceFormated[0]).toEqual({
      lastName: "Seles",
      firstName: "Monica",
      gender: "Female",
      dob: "2/12/1973",
      favoriteColor: "Black",
      middleInitial: "H"
    });
  });
  it("Should sort pipeFormated LastName  ascending", () => {
    let sortByProps = [
      {
        prop: "lastName",
        direction: 1
      }
    ];
    sortByProperty(pipeFormated, sortByProps);
    expect(pipeFormated).toHaveLength(3);
    // test the entities in the Array
    expect(pipeFormated[0]).toEqual({
      lastName: "Bonk",
      firstName: "Radek",
      gender: "Male",
      dob: "6/3/1975",
      favoriteColor: "Green",
      middleInitial: "S"
    });
    expect(pipeFormated[2]).toEqual({
      lastName: "Smith",
      firstName: "Steve",
      gender: "Male",
      dob: "3/3/1985",
      favoriteColor: "Red",
      middleInitial: "D"
    });
  });

  // Testing the Display results output
  describe("Main Final Test", () => {
    it("Establish the Fixture Snapshot", () => {
      expect(combined).toMatchSnapshot();
      expect(mockCombined).toMatchSnapshot();

      // expect(combined).toEqual(mockCombined)
    });

    // Output 1 - sorted by gender (females before males) then by last name ascending
    it("Should sort combined sorted by gender (females before males) then by last name ascending", () => {
      let sortByProps = [
        {
          prop: "gender",
          direction: 1
        },
        {
          prop: "lastName",
          direction: 1
        }
      ];
      sortByProperty(mockCombined, sortByProps);

      expect(mockCombined).toHaveLength(9);
      // test the entities in the Array
      expect(mockCombined[0]).toEqual({
        lastName: "Hingis",
        firstName: "Martina",
        gender: "Female",
        dob: "2/4/1979",
        favoriteColor: "Green",
        middleInitial: "M"
      });
      expect(mockCombined[3]).toEqual({
        lastName: "Seles",
        firstName: "Monica",
        gender: "Female",
        dob: "2/12/1973",
        favoriteColor: "Black",
        middleInitial: "H"
      });
      expect(mockCombined[8]).toEqual({
        lastName: "Smith",
        firstName: "Steve",
        gender: "Male",
        dob: "3/3/1985",
        favoriteColor: "Red",
        middleInitial: "D"
      });
    });

    // Output 2 - sorted by birth date, ascending then by last name ascending
    it("Should sort combined sorted by birth date, ascending then by last name ascending", () => {
      let sortByProps = [
        {
          prop: "dob",
          direction: 1
        },
        {
          prop: "lastName",
          direction: 1
        }
      ];
      sortByProperty(mockCombined, sortByProps);
      expect(mockCombined).toHaveLength(9);

      //  test the entities in the Array in the Array
      expect(mockCombined[0]).toEqual({
        lastName: "Abercrombie",
        firstName: "Neil",
        gender: "Male",
        dob: "2/13/1943",
        favoriteColor: "Tan",
        middleInitial: ""
      });
      expect(mockCombined[3]).toEqual({
        lastName: "Seles",
        firstName: "Monica",
        gender: "Female",
        dob: "2/12/1973",
        favoriteColor: "Black",
        middleInitial: "H"
      });
      expect(mockCombined[8]).toEqual({
        lastName: "Smith",
        firstName: "Steve",
        gender: "Male",
        dob: "3/3/1985",
        favoriteColor: "Red",
        middleInitial: "D"
      });
    });

    // Output 3 - sorted by last name, descending
    it("Should sort combined sorted by last name, descending", () => {
      let sortByProps = [
        {
          prop: "lastName",
          direction: -1
        }
      ];
      sortByProperty(mockCombined, sortByProps);
      expect(mockCombined).toHaveLength(9);
      // test the entities in the Array
      expect(mockCombined[8]).toEqual({
        lastName: "Abercrombie",
        firstName: "Neil",
        gender: "Male",
        dob: "2/13/1943",
        favoriteColor: "Tan",
        middleInitial: ""
      });
      expect(mockCombined[3]).toEqual({
        lastName: "Kelly",
        firstName: "Sue",
        gender: "Female",
        dob: "7/12/1959",
        favoriteColor: "Pink",
        middleInitial: ""
      });
      expect(mockCombined[0]).toEqual({
        lastName: "Smith",
        firstName: "Steve",
        gender: "Male",
        dob: "3/3/1985",
        favoriteColor: "Red",
        middleInitial: "D"
      });
    });

    // displayResults Test
    it("Displays final Results in the Console Test", done => {
      let results = displayResults(combined);
      expect(results).toHaveProperty("output1");
      expect(results).toHaveProperty("output2");
      expect(results).toHaveProperty("output3");
      done();
    });
  });
});

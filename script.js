const path = require("path");
const fs = require("fs");
const Person = require("./Person.js");
const {
  convertDelimiter,
  formatByType,
  splitArray,
  sortByProperty
} = require("./utils");

// const { Person } = require("../Person");
// Placed all text files in data they need to be named comma, space, pipe according to their format.

//joining path of directory
const directoryPath = path.join(__dirname, "data");

// Gets Files from a Directory parses them and Displays Results
function getFilesFromText(directoryPath, displayResults) {
  //Final Output Array
  let results = [];
  //passing directoryPath
  fs.readdir(directoryPath, function(err, files) {
    //handling error
    if (err) {
      throw new Error("Unable to scan directory: " + err);
    }

    //listing all files in data folder using forEach
    files.forEach(function(file) {
      // Strip bare text name
      let textFileName = file.split(".")[0];
      // creates delimiter from text filename
      let delimiter = convertDelimiter(textFileName);
      // Reads in Local file By file name
      let data = fs.readFileSync(`${directoryPath}/${file}`, "utf8");
      // converts the data to a array
      let array = data.toString().split("\n");
      // Splits Array by Delimiter
      let splitTextArray = splitArray(array, delimiter);
      // formats into a json format by Property name
      let formattedArray = formatByType(splitTextArray, textFileName, Person);
      // Push Final results into the results array
      results.push(...formattedArray);
    });
    // output final results callback
    displayResults(results);

    return results;
  });
}

// Displays final Results in the Console
function displayResults(results) {
  // Prepare Outputs

  // Output 1 - sorted by gender (females before males) then by last name ascending
  let output1Props = [
    {
      prop: "gender",
      direction: 1
    },
    {
      prop: "lastName",
      direction: 1
    }
  ];
  const output1 = [...sortByProperty(results, output1Props)];
  console.log("Output 1");
  console.table(output1);

  // Output 2 - sorted by birth date, ascending then by last name ascending
  let output2Props = [
    {
      prop: "dob",
      direction: 1
    },
    {
      prop: "lastName",
      direction: 1
    }
  ];
  const output2 = [...sortByProperty(results, output2Props)];
  console.log("Output 2");
  console.table(output2);

  // Output 3 - sorted by last name, descending
  let output3Props = [
    {
      prop: "lastName",
      direction: -1
    }
  ];
  const output3 = [...sortByProperty(results, output3Props)];
  console.log("Output 3");
  console.table(output3);

  return { output2, output1, output3 };
}

// Gets the Files from Data Directory and Displays results
getFilesFromText(directoryPath, displayResults);

// exports for test
module.exports = {
  Person,
  splitArray,
  formatByType,
  directoryPath,
  convertDelimiter,
  sortByProperty,
  displayResults,
  getFilesFromText
};

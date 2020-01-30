// Person Class
class Person {
  constructor(
    firstName = "",
    middleInitial = "",
    lastName = "",
    gender = "",
    dob = "",
    favoriteColor = ""
  ) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.gender = gender;
    this.dob = dob;
    this.favoriteColor = favoriteColor;
    this.middleInitial = middleInitial;

    // Formats the date according to the data
    // you can switch the date structure to euro style
    // by passing (euro= true)
    this.formatDate = (euro = false) => {
      let delimiter = "/";
      // checks for spaces
      if (this.dob.indexOf(" ") !== -1) {
        delimiter = " ";
      } else {
        //checks date for - or /
        delimiter = this.dob.indexOf("/") === -1 ? "-" : "/";
      }
      // us data format
      let [mon, day, year] = this.dob.split(delimiter);
      // if true display euro
      if (euro) {
        [day, mon, year] = this.dob.split(delimiter);
      }
      this.dob = `${mon}/${day}/${year}`;
      return this.dob;
    };
    // Formats the Gender on the person
    this.formatGender = gen => {
      let gender = gen
        ? gen
        : this.gender.toLowerCase().indexOf("m") === 0
        ? "Male"
        : "Female";
      this.gender = gender;
      return this.gender;
    };
    // Returns a formatted Object
    this.formatMe = (euro = false) => {
      return {
        lastName: this.lastName,
        firstName: this.firstName,
        gender: this.formatGender(),
        dob: this.formatDate(euro),
        favoriteColor: this.favoriteColor,
        middleInitial: this.middleInitial
      };
    };
  }

}

module.exports = Person;

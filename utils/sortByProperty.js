/* sortByProperty(arr, sortBy) - Sort By Property function
* arr: Array
* sortBy: Function - accepts multiple props in a Array,
* you can use -1 in the direction to change order. from 'asc to desc'
  [prop: 'Prop to sort':<string>, direction: '1':<num>]
  usage:
  let sortByProps = [
        {
        prop:'dob',
        direction: 1
      }];
  sortByProperty(Array,sortByProps)
  *
*/
const sortByProperty = (arr, sortBy) => {
  return arr.sort(function(a, b) {
    let i = 0,
      result = 0;
    // Loop through sortBy Array
    while (i < sortBy.length && result === 0) {
      // establish sort props
      let c = a[sortBy[i].prop].toString();
      let d = b[sortBy[i].prop].toString();
      //  Special case to sort dates
      if (sortBy[i].prop === "dob" || c.indexOf("/") !== -1) {
        result = sortBy[i].direction * new Date(c) - new Date(d);
      } else {
        result = sortBy[i].direction * (c < d ? -1 : c > d ? 1 : 0);
      }

      i++;
    }
    return result;
  });
};


module.exports = sortByProperty;
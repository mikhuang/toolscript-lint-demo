const unused = moment(dateToUndefined.value).format(); // invalid
const okayUnused = moment(dateToUndefined.value ?? "invalid")
  .tz("America/Los_Angeles")
  .format(); // ok

return moment(dateToUndefined.value).format(); // invalid

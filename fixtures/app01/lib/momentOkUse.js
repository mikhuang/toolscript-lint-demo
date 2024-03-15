return moment(dateToUndefined.value ?? "invalid")
  .tz(
    "America/Los_Angeles"
  )
  .format();

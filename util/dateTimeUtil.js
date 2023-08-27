const getDateDifference = (date1, date2) => {
  // convert the dates to milliseconds
  let date1Ms = date1.getTime();
  let date2Ms = date2.getTime();

  // calculate the difference in milliseconds
  let differenceMs = Math.abs(date1Ms - date2Ms);

  // convert the difference from milliseconds to hours
  return differenceMs / (1000 * 60 * 60);
};

const convertoDay = (utcTimeString) => {
  const options = {
    timeZone: "America/New_York",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const localDateWithDay = new Date(utcTimeString).toLocaleDateString(
    "en-US",
    options
  );
  return localDateWithDay;
};

const convertoTime = (utcTimeString) => {
  const estTimeString = new Date(utcTimeString).toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  return estTimeString;
};

const convertoDayandTime = (utcTimeString) => {
  const options2 = {
    timeZone: "America/New_York",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const localDateWithDay = new Date(utcTimeString).toLocaleDateString(
    "en-US",
    options2
  );
  return localDateWithDay;
};

module.exports = {
  getDateDifference,
  convertoDayandTime,
  convertoDay,
  convertoTime,
};

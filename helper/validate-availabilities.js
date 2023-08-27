const validateAvailabilities = (availabilities) => {
  let msgs = [];
  if (availabilities) {
    if (!Array.isArray(availabilities)) {
      msgs.push("Invalid availability format! Please provide an array");
      return msgs;
    }
    if (availabilities.length != 7) {
      msgs.push("Invalid availability numbers! Days should be equal to 7!");
      return msgs;
    }
    availabilities.forEach((availability) => {
      if (
        !["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].includes(
          availability.day
        )
      ) {
        msgs.push(
          "Invalid day! Only Sun, Mon, Tue, Wed, Thu, Fri and Sat are valid! "
        );
      }
      const reg = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
      let isValidStartTime = reg.test(availability.start);
      if (!isValidStartTime) {
        msgs.push("Invalid start time! The correct format is 00:00 ");
      }
      let isValidEndTime = reg.test(availability.end);
      if (!isValidEndTime) {
        msgs.push("Invalid end time! The correct format is 00:00 ");
      }
      if (![true, false].includes(availability.isAvailable)) {
        msgs.push("Invalid isAvailable field! only true or false is accepted");
      }
    });
  }
  return msgs;
};

module.exports = validateAvailabilities;

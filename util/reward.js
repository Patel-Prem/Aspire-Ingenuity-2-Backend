const getRewardMetrics = (loggedInUser) => {
  let noOfCompletedShift = loggedInUser.noOfCompletedShift;
  let rating = loggedInUser.rating;

  console.log("The user is " + loggedInUser.email);
  console.log(loggedInUser);
  console.log("The no of shift completed is " + noOfCompletedShift);
  console.log("The no of shift completed in NO " + Number(noOfCompletedShift));
  let isElligible = false;
  let canApplyUptoHG = 50;
  let canModifyUptoHG = 45;
  let canApplyUptoHA = 27;
  let canModifyUptoHA = 22;

  if (Number(noOfCompletedShift) < 10) {
    isElligible = false;
    canApplyUptoHG = 50;
    canModifyUptoHG = 45;
    canApplyUptoHA = 27;
    canModifyUptoHA = 22;
  }

  if (
    Number(noOfCompletedShift) > 10 &&
    Number(noOfCompletedShift) < 30 &&
    Number(rating) >= 4.5
  ) {
    isElligible = true;
    canApplyUptoHG = 60;
    canModifyUptoHG = 55;
    canApplyUptoHA = 37;
    canModifyUptoHA = 32;
  }

  if (Number(noOfCompletedShift) > 30 && Number(rating) >= 4.5) {
    isElligible = true;
    canApplyUptoHG = 65;
    canModifyUptoHG = 65;
    canApplyUptoHA = 47;
    canModifyUptoHA = 47;
  }

  let reward = {
    isElligible,
    canApplyUptoHG,
    canModifyUptoHG,
    canApplyUptoHA,
    canModifyUptoHA,
  };
  return reward;
};
module.exports = { getRewardMetrics };

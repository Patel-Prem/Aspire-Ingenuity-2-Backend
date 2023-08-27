const validateEducation = (educations) => {
  let msgs = [];

  if (educations) {
    if (!Array.isArray(educations)) {
      msgs.push("Invalid Format! Array is required");
      return msgs;
    }
    educations.forEach((education) => {
      if (education.schoolName == null || education.schoolName == "") {
        msgs.push("schoolName name is Required!");
      }
      if (
        education.yearOfGraduation == null ||
        education.yearOfGraduation == ""
      ) {
        msgs.push("yearOfGraduation is Required!");
      }
      if (education.course == null || education.course == "") {
        msgs.push("course is Required!");
      }
    });
  }
  return msgs;
};

module.exports = validateEducation;

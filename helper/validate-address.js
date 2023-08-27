const validateAddress = (address) => {
  let msgs = [];
  if (address) {
    if (address.address == null || address.address == "") {
      msgs.push("Street Address is Required!");
    }
    if (address.city == null || address.city == "") {
      msgs.push("City is Required!");
    }
    if (address.province == null || address.province == "") {
      msgs.push("Province Address is Required!");
    }
    if (address.postalCode == null || address.postalCode == "") {
      msgs.push("Postal Code is Required!");
    }
    if (address.contactNumber == null || address.contactNumber == "") {
      msgs.push("Contact Number is Required!");
    }
  }

  return msgs;
};

module.exports = validateAddress;

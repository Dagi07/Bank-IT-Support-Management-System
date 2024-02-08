const validateAddReqBody = (addReqBody) => {
  if (!addReqBody.issue || !addReqBody.fullName) {
    return "Both fields should be filled in!";
  }
  if (!/[A-Za-z]+\s[A-Za-z]+/gm.test(addReqBody.fullName)) {
    return "Please enter your full name";
  }
};

const validateAddBranchBody = (addBranchBody) => {
  if (
    !addBranchBody.username ||
    !addBranchBody.city ||
    !addBranchBody.name ||
    !addBranchBody.phoneno ||
    !addBranchBody.password
  ) {
    return "All fields should be filled in!";
  }
  if (!/^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+$/gm.test(addBranchBody.username)) {
    return "Please enter a valid branch username";
  }
  if (addBranchBody.phoneno.length < 10 || addBranchBody.phoneno.length > 15) {
    return "Please enter a valid phone number";
  }
};
const validateAddOfficerBody = (addOfficerBody) => {
  if (
    !addOfficerBody.firstName ||
    !addOfficerBody.lastName ||
    !addOfficerBody.email ||
    !addOfficerBody.phoneno ||
    !addOfficerBody.password
  ) {
    return "All fields should be filled in!";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/gm.test(addOfficerBody.email)) {
    return "Please enter a valid Officer email";
  }
  if (
    addOfficerBody.phoneno.length < 10 ||
    addOfficerBody.phoneno.length > 15
  ) {
    return "Please enter a valid phone number";
  }
};

const validateLogin = (loginData) => {
  if (!loginData.username || !loginData.password) {
    return "Both fields should be filled in!";
  }
  if (!/^[a-zA-Z0-9_]+@[a-zA-Z0-9_.]+$/gm.test(loginData.username)) {
    return "Please enter a valid email or branch username";
  }
};

module.exports = {
  validateAddReqBody,
  validateAddBranchBody,
  validateAddOfficerBody,
  validateLogin,
};

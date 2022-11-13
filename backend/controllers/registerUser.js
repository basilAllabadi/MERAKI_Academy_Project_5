const pool = require("../models/db");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { email, password, fullName, dateOfBirth, gender } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const values = [
    email.toLowerCase(),
    hashedPassword,
    fullName,
    dateOfBirth,
    gender,
  ];
  const query =
    "INSERT INTO users (email,password,fullName,dateOfBirth,gender) VALUES($1,$2,$3,$4,$5)";
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "Account Created Successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        massage: "The email already exists",
        err,
      });
    });
};
const registerUserComplete = (req, res) => {
  const userId = req.params.userId;
  const {
    phoneNumber,
    maritalStatus,
    citizenships,
    whereDoYouLive,
    residencyStatus,
    yearsOfExperience,
    recentJobTitle,
    recentJobFunction,
    industryOfRecentJob,
    languages,
    skills,
    educationLevel,
    major,
    educationalInstituteName,
    cv,
  } = req.body;
  const iscompleted = 1;
  const values = [
    userId,
    iscompleted,
    phoneNumber,
    maritalStatus,
    citizenships,
    whereDoYouLive,
    residencyStatus,
    yearsOfExperience,
    recentJobTitle,
    recentJobFunction,
    industryOfRecentJob,
    languages,
    skills,
    educationLevel,
    major,
    educationalInstituteName,
    cv,
  ];
  const query = `UPDATE users SET iscompleted =COALESCE($2,iscompleted),phoneNumber =COALESCE($3,phoneNumber),maritalStatus =COALESCE($4,maritalStatus),citizenships=COALESCE($5,citizenships), whereDoYouLive=COALESCE($6,whereDoYouLive),residencyStatus=COALESCE($7,residencyStatus),yearsOfExperience=COALESCE($8,yearsOfExperience)  ,recentJobTitle=COALESCE($9,recentJobTitle),recentJobFunction=COALESCE($10,recentJobFunction),industryOfRecentJob=COALESCE($11,industryOfRecentJob),languages=COALESCE($12,languages),skills=COALESCE($13,skills) ,educationLevel=COALESCE($14,educationLevel),major=COALESCE($15,major),educationalInstituteName=COALESCE($16,educationalInstituteName),cv=COALESCE($17,cv) WHERE id=$1;`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "User Profile Completed",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        massage: "Something went Wrong",
        err,
      });
    });
};

module.exports = { registerUser, registerUserComplete };

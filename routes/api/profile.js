const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator/check");
const profileController = require('../../controllers/profileController')

// GET to api/profile/me
// DESC display current users profile
// ACCESS private
router.get("/me", auth, profileController.getUserProfile);

// // POST to api/profile/
// // DESC create or update user profile
// // ACCESS private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills are required")
        .not()
        .isEmpty()
    ]
  ],
  profileController.createOrUpdateProfile
);

// GET to api/profile/
// DESC get all profiles
// ACCESS public
router.get("/", profileController.getProfiles);

// GET to api/profile/user/:user_id
// DESC get singular profile by ID
// ACCESS public

router.get("/user/:user_id", profileController.getUserProfileById);
// DELETE to api/profile/
// DESC delete profile/user and post
// ACCESS private

router.delete("/", auth, profileController.deleteProfileUserAndPosts);

// PUT to api/profile/experience
// DESC add profile experience
// ACCESS private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  profileController.addProfileExperience
);

// DELETE to api/profile/experience/:exp_id
// DESC delete profile experience
// ACCESS private
router.delete("/experience/:exp_id", auth, profileController.deleteProfileExperience);

// PUT to api/profile/eduction
// DESC add profile eduction
// ACCESS private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of Study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  profileController.addProfileEducation
);

// DELETE to api/profile/education/:edu_id
// DESC delete profile education
// ACCESS private
router.delete("/education/:edu_id", auth, profileController.deleteProfileEducation);

// GET to api/profile/github/:username
// DESC get user repos from github
// ACCESS public
router.get("/github/:username", profileController.getUserGithubRepos);

module.exports = router;

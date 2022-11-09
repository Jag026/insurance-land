const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookieCompany, requireAuthCompany } = require('../../utils/auth');
const { Company } = require('../../db/models');
const { Policy } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, ownedPolicies } = req.body;
    const company = await Company.signup({ email, username, password, ownedPolicies });

    await setTokenCookieCompany(res, company);

    return res.json({
      company
    });
  }
);

// Add policy
router.post(
  '/add-policy',
  async (req, res) => {
    const { name, premium, description, companyName } = req.body;
    const policy = await Policy.create({ name, premium, description, companyName });

    return res.json({
      policy
    });
  }
);

module.exports = router;
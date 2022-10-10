const express = require('express');

const { setTokenCookieCompany, requireAuthCompany } = require('../../utils/auth');
const { Company } = require('../../db/models');

const router = express.Router();


// Sign up
router.post(
  '/',
  async (req, res) => {
    const { email, password, username, ownedPolicies } = req.body;
    const company = await Company.signup({ email, username, password, ownedPolicies });

    await setTokenCookieCompany(res, company);

    return res.json({
      company
    });
  }
);

module.exports = router;
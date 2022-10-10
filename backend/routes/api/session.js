const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { setTokenCookieCompany, restoreCompany } = require('../../utils/auth');
const { Company } = require('../../db/models');

const router = express.Router();

//User Session
// Log in
router.post(
  '/',
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('XSRF-TOKEN');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

//Company Session
// Log in
router.post(
  '/company-login',
  async (req, res, next) => {
    const { credential, password } = req.body;

    const company = await Company.login({ credential, password });

    if (!company) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookieCompany(res, company);

    return res.json({
      company
    });
  }
);

// Log out
router.delete(
  '/company-logout',
  (_req, res) => {
    res.clearCookie('XSRF-TOKEN');
    return res.json({ message: 'success' });
  }
);

// Restore session company
router.get(
    '/company-session',
  restoreCompany,
  (req, res) => {
    const { company } = req;
    if (company) {
      return res.json({
        company: company.toSafeObject()
      });
    } else return res.json({});
  }
);

module.exports = router;

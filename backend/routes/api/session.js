const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { setTokenCookieCompany, restoreCompany } = require('../../utils/auth');
const { Company } = require('../../db/models');

const { Policy } = require('../../db/models');

const router = express.Router();


const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

//User Session
// Log in
router.post(
  '/',
  validateLogin,
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
    res.clearCookie('token');
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
  validateLogin,
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
    res.clearCookie('tokenCompany');
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

router.post('/policies', async (req, res) => {
  const policies = await Policy.findAll({ order: [['id', 'ASC']] });
  return res.json({policies});
});

router.post(
    '/add-user-policy',
  restoreUser,
  async (req, res, next) => {
    const { num, userId } = await req.body;
    await User.addPolicy({ num, userId })
     return res.json({
    });
  }
);

router.post(
    '/add-company-policy',
  restoreCompany,
  async (req, res, next) => {
    const { num, companyId } = await req.body;
    await Company.addPolicy({ num, companyId })
     return res.json({
    });
  }
);

router.post(
    '/delete-policy',
  restoreUser,
  async (req, res, next) => {
    const { policyId, userId } = await req.body;
    await User.deletePolicy({ policyId, userId })
     return res.json({
    });
  }
);

router.post(
    '/company-delete-policy',
  restoreCompany,
  async (req, res, next) => {
    const users = await User.findAll({ order: [['id', 'ASC']] });
    const { policyId, companyId } = await req.body;
    const policy = await Policy.findByPk(policyId);
    await policy.destroy();
    console.log(policy);
    console.log(users[0]['dataValues']['id'])
    console.log(companyId)
    users.forEach(user => {
      console.log(user);
        const policyIds = JSON.parse(user['dataValues']['policyIds']);
        if (policyIds.includes(policyId)) {
          const newPolicyIds = policyIds.filter(policy => policy !== policyId);
          const userId = user.id;
          User.deletePolicy({ policyId, userId })
        } 
    })
    await Company.deletePolicy({ policyId, companyId })
     return res.json({
    });
  }
);

module.exports = router;
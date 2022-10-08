const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const { restoreCompany } = require('../../utils/auth.js');

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { setTokenCookieCompany } = require('../../utils/auth.js');

const { User } = require('../../db/models');
const { Company } = require('../../db/models');

router.use(restoreUser);
router.use(restoreCompany);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

router.get(
  '/restore-company',
  (req, res) => {
    return res.json(req.company);
  }
);

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});

router.get('/set-token-cookie-company', async (_req, res) => {
  const company = await Company.findOne({
      where: {
        username: 'fakecompany55'
      }
    });
  setTokenCookieCompany(res, company);
  return res.json({ company });
});

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth-company
const { requireAuthCompany } = require('../../utils/auth.js');
router.get(
  '/require-auth-company',
  requireAuthCompany,
  (req, res) => {
    return res.json(req.company);
  }
);


module.exports = router;
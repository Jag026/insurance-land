const router = require('express').Router();
const sessionRouter = require('./session.js')
const userRouter = require('./users.js');
const companyRouter = require('./companies.js')
const { restoreUser } = require('../../utils/auth.js');
const { restoreCompany } = require('../../utils/auth.js');

router.use(restoreUser);
router.use(restoreCompany);

router.use('/session', sessionRouter);
router.use('/users', userRouter);
router.use('/companies', companyRouter);

router.get('/test', function (req, res) {
  res.json("Hello")
});

module.exports = router;
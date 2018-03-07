const router = require('koa-router')();
const reportController = require('../controllers/report');

router.post('/api/report/text', reportController.text)
    .post('/api/report/file', reportController.file);

module.exports = router;
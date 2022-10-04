const router = require('express').Router();

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body })
})

module.exports = router;


fetch('/api/test', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `1kz6ujfT-X0HBm5Oyc4uJQNyicMRua66-buA`
    },
    body: JSON.stringify({ hello: 'world' })
}).then(res = res.json()).then(data => console.log(data));
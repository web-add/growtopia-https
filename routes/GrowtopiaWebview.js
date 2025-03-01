const express = require('express');
const { server_name } = require('../Config');

const router = express.Router();

router.all('/login/dashboard', function (req, res) {
    const tData = {};

    try {
        const uData = JSON.stringify(req.body).split('"')[1].split('\\n');
        const uName = uData[0].split('|'); 
        const uPass = uData[1].split('|');
        for (let i = 0; i < uData.length - 1; i++) {
            const d = uData[i].split('|');
            tData[d[0]] = d[1];
        }
        if (uName[1] && uPass[1]) {
            res.redirect('/player/growid/login/validate');
        }
    } catch (why) { 
        console.error('Error: ' + why);
    }

    return res.render('growtopia/DashboardView', { 
        server_name: server_name || 'GrowPlus',
        data: tData,
    });
});

router.all('/growid/login/validate', (req, res) => {
    const _token = req.body._token;
    const growId = req.body.growId;
    const password = req.body.password;

    const token = Buffer.from(
        `_token=${_token}&nameServer=${server_name}&growId=${growId}&password=${password}`,
    ).toString('base64');

    res.send(
        `{"status":"success","message":"Account Validated.","token":"${token}","url":"","accountType":"growtopia"}`,
    );
});

router.all('/growid/checktoken', (req, res) => {
    res.send(`{"status":"success","message":"Account Validated.","token":"${req.body.refreshToken}","url":"","accountType":"growtopia"}`,);
});

module.exports = router;
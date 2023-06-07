const express = require('express');
const router = express.Router()
const fs = require('fs')
const mustache = require('mustache')
const logger = require('../utils/logger')
const qr = require('qr-image')
const config = require('../config')

router.get('/', function (req, res) {
    logger.log('/support', [req.id]);
    res.setHeader('Content-Type', 'text/html')
    let html = fs.readFileSync('./templates/support.html').toString('utf8')

    let data = {
        uris : ['Todo'],
        num_of_accounts: 'wip',
        num_of_sats: 'wip',
        forwardReserveFee: config.forwardReserveFee,
        forwardReserveFeeInPercent: (config.forwardReserveFee * 100.0).toFixed(2),
        intraHubFee: config.intraHubFee,
        intraHubFeeInPercent: (config.intraHubFee * 100.0).toFixed(4),
        allowLightningPaymentToNode: config.allowLightningPaymentToNode,
        accountCreationMode: config.accountCreationMode,
        generateSafetyOnChainAddress: config.generateSafetyOnChainAddress,
    }

    return res.status(200).send(mustache.render(html, Object.assign({}, data)))
});

module.exports = router

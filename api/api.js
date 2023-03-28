const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const serial = require('generate-serial-key');

const Card = require('../models/card.model');
const { GeneralError, BadRequest } = require('../middleware/error');

const router = express.Router();

const jsonParser = bodyParser.json();

router.get('/', async (req, res, next) => {
    res.status(200).json(await Card.find());
});

router.get('/find', async (req, res, next) => {
    try {
        const { ref: ref } = req.body;
        if (!ref) {
            throw new BadRequest('Missing required field: ref');
        }
        else {
            Card.findOne({ ref: ref })
                .then(card => {
                    res.status(200).json(card);
                }
            )
        }
    }
    catch(err) { next(err); };
});

router.get('/sayhi', (req, res, next) => {
    res.status(200).json({ message: 'hi' });
});

router.post('/create', jsonParser, async (req, res, next) => {
    try {
        console.log(req.body);
        const {
            name: name,
            company: company,
            cell: cell,
            fax: fax,
            address: address,
            position: position,
            email: email,
            website: website
        } = req.body;
        if (!name || !company || !cell || !address || !email) {
            throw new BadRequest('Missing required field');
        }
        else {
            const ref = serial.generate(8,"-", 4);
            const cardFields = {
                name: name,
                company: company,
                ref: ref,
                cell: cell,
                fax: fax,
                address: address,
                position: position,
                email: email,
                website: website
            }
            Card.create(cardFields)
                .then(card => {
                    res.status(201).json(card);
                })
                .catch(err => {
                    throw new GeneralError(err);
                });
        }
    }
    catch(err) { next(err); }
})

module.exports = router;
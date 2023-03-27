const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');

const Card = require('../models/card.model');
const { GeneralError, BadRequest } = require('../middleware/error');

const router = express.Router();

const jsonParser = bodyParser.json();

router.get('/', async (req, res, next) => {
    res.status(200).json(await Card.find());
});

router.get('/find', async (req, res, next) => {
    try {
        const { ref } = req.params;
        if (!ref) {
            throw new BadRequest('Missing required field: ref');
        }
        else {
            Card.findOne({ ref: ref }, async (err, card) => {
                if (err) {
                    throw new GeneralError(err);
                }
                else {
                    res.status(200).json(card);
                }
            });
        }
    }
    catch(err) { next(err); };
});

router.get('/sayhi', (req, res, next) => {
    res.status(200).json({ message: 'hi' });
});

router.post('/create', jsonParser, async (req, res, next) => {
    try {
        const { name, company, cell, fax, address, position, email, website } = req.body;
        if (!name || !ref || !company || !cell || !address || !email) {
            throw new BadRequest('Missing required field');
        }
        else {
            Club.create({})
        }
    }
    catch(err) { next(err); }
})

module.exports = router;
require('dotenv').config();
const express = require('express');
const router = express.Router();
const RequestRide = require('../Models/requestRideDetailsModel');
const cors = require('cors');
router.use(cors());
const CognitoExpress = require('cognito-express');

router.get('/', authenticateToken, async (req, res) => {
    try {
        let rideDetails = await RequestRide.find();
        let resObj = {
            status: true,
            message: 'Data fetched successfully',
            data: rideDetails
        }
        res.json(resObj);
    } catch (error) {
        res.send('Error occured' + ' ' + error);
    }
});

router.post('', authenticateToken, async (req, res) => {
    const requestRide = new RequestRide({
        requestedTo: req.body.requestedTo,
        requestedFrom: req.body.requestedFrom,
        requestedFromfrom: req.body.requestedFromfrom,
        requestedFromto: req.body.requestedFromto,
        requestedFromTime: req.body.requestedFromTime
    });
    try {
        const requestride = await requestRide.save();
        let resObj = {
            status: true,
            message: 'Data saved successfully',
            data: requestride
        }
        res.json(resObj);
    } catch (error) {
        res.json('Error occured' + ' ' + error);
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const ride = await RequestRide.findById(req.params.id);
        const a = await ride.deleteOne()
        const resObj = {
            status: true,
            messasge: "ride deleted successfully",
            data: ride
        }
        res.json(resObj);
    } catch (err) {
        const resObj = {
            status: false,
            messasge: "Something went wrong",

        }
        res.json(resObj);
    }
});

function authenticateToken(req, res, next) {
    const cognitoExpress = new CognitoExpress({
        region: 'ap-south-1',
        cognitoUserPoolId: process.env.USER_POOL_ID,
        tokenUse: 'access',
        tokenExpiration: 3600000
    });
    let accessTokenFromClient = req.headers['auth'];
    if (!accessTokenFromClient) return res.status(401).send('Access Token missing from header');
    cognitoExpress.validate(accessTokenFromClient, function (err, response) {
        if (err) return res.status(401).send('Invalid Token');
        else next();
    });
}

module.exports = router;
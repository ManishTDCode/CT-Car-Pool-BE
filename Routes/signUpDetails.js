require('dotenv').config();
const express = require('express');
const router = express.Router();
const SignUP = require('../Models/signUpDetails');
const cors = require('cors');
router.use(cors());
const jwt = require('jsonwebtoken');
const CognitoExpress = require('cognito-express');

router.post('', async (req, res) => {
const signUpDetails = new SignUP({
    name: req.body.name,
    emailId: req.body.emailId,
    mobileNumber: req.body.mobileNumber,
    rideType: req.body.rideType,
    vehicleNumber: req.body.vehicleNumber,
    vehicleColor: req.body.vehicleColor,
    carType: req.body.carType
});
try {
    const signup = await signUpDetails.save();
    let resObj = {
        status: true,
        message: 'Data saved successfully',
        empList: signup
    }
    res.json(resObj);
} catch (error) {
    let errorCode = error.code;
        if (errorCode == 11000) {
            let resObj = {
                status: false,
                message: 'Duplicate data found',
                empList: []
            }
            res.json(resObj);
        }
        else {
            res.json('Error occured' + ' ' + error);
        }
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
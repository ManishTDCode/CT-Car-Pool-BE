require('dotenv').config();
const express = require('express');
const router = express.Router();
const CreateRide = require('../Models/createRideDetails');
const cors = require('cors');
router.use(cors());
const CognitoExpress = require('cognito-express');

router.post('', authenticateToken, async (req, res) => {
    const createRide = new CreateRide({
        ridetype: req.body.ridetype,
        vehiclenumber: req.body.vehiclenumber,
        vehiclecolor: req.body.vehiclecolor,
        vehicletype: req.body.vehicletype,
        from: req.body.from,
        to: req.body.to,
        fare: req.body.fare,
        seats: req.body.seats
    });
    try {
        const createride = await createRide.save();
        let resObj = {
            status: true,
            message: 'Data saved successfully',
            data: createride
        }
        res.json(resObj);
    } catch (error) {
        let errorCode = error.code;
            if (errorCode == 11000) {
                let resObj = {
                    status: false,
                    message: 'Duplicate data found',
                    data: []
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
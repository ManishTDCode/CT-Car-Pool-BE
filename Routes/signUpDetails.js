require('dotenv').config();
const express = require('express');
const router = express.Router();
const SignUP = require('../Models/signUpDetailsModel');
const cors = require('cors');
router.use(cors());

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
            data: signup
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

router.get('/',  async (req, res) => {
    try {
        let userDetails = await SignUP.find();
        let resObj = {
            status: true,
            message: 'Data fetched successfully',
            data: userDetails
        }
        res.json(resObj);
    } catch (error) {
        res.send('Error occured' + ' ' + error);
    }
});

module.exports = router;
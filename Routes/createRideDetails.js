require('dotenv').config();
const express = require('express');
const router = express.Router();
const CreateRide = require('../Models/createRideDetailsModel');
const cors = require('cors');
router.use(cors());
const CognitoExpress = require('cognito-express');

router.get('/', authenticateToken, async (req, res) => {
    try {
        let rideDetails = await CreateRide.find();
        for (let i = 0; i < rideDetails.length; i++) {
            if (rideDetails[i].seats == 0) {
                rideDetails[i].excluded = true;
            }
            else {
                rideDetails[i].excluded = false;
            }
        }
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

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const rideDetails = await CreateRide.findById(req.params.id);
        let resObj = {
            status: true,
            message: 'Data fetched successfully',
            data: rideDetails
        }
        res.json(resObj);
    } catch (error) {
        res.status(404);
        res.send('No employee found with given id');
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const ride = await CreateRide.findById(req.params.id);
        const a = await ride.deleteOne()
        const resObj = {
            status: true,
            messasge: "Ride deleted successfully",
            book: ride
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

router.post('', authenticateToken, async (req, res) => {
    const createRide = new CreateRide({
        name: req.body.name,
        mobileNo: req.body.mobileNo,
        emailId: req.body.emailId,
        ridetype: req.body.ridetype,
        vehiclenumber: req.body.vehiclenumber,
        vehiclecolor: req.body.vehiclecolor,
        vehicletype: req.body.vehicletype,
        from: req.body.from,
        to: req.body.to,
        fare: req.body.fare,
        seats: req.body.seats,
        time: req.body.time,
        date: req.body.date
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
        res.json('Error occured' + ' ' + error);
    }
});

// router.put('/:id', authenticateToken, async (req, res) => {
//     try {
//         const ride = await CreateRide.findById(req.params.id);
//         console.log(ride);
//         ride.name = req.body.name,
//             ride.mobileNo = req.body.mobileNo,
//             ride.emailId = req.body.emailId,
//             ride.ridetype = req.body.ridetype,
//             ride.vehiclenumber = req.body.vehiclenumber,
//             ride.vehiclecolor = req.body.vehiclecolor,
//             ride.vehicletype = req.body.vehicletype,
//             ride.from = req.body.from,
//             ride.to = req.body.to,
//             ride.fare = req.body.fare,
//             ride.seats = req.body.seats,
//             ride.time = req.body.time,
//             ride.date = req.body.date
//         const updatedRide = ride.save();
//         let resObj = {
//             status: true,
//             message: 'ride updated successfully',
//             empList: updatedRide
//         }
//         res.json(resObj);
//     } catch (error) {
//         res.json('error occured:' + error)
//     }
// })
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const ride = await CreateRide.findById(req.params.id);
        parameter = Object.keys(req.body)[0];
        ride[parameter] = req.body[parameter];
        const updatedRide = ride.save();
        let resObj = {
            status: true,
            message: 'ride updated successfully',
            empList: updatedRide
        }
        res.json(resObj);
    } catch (error) {
        res.json('error occured:' + error)
    }
})

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
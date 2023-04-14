const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
const nodemailer = require('nodemailer');



router.post('/', (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            service: 'outlook',
            secureConnection: false,
            tls: {
                ciphers: 'SSLv3'
            },
            port: 587,
            auth: {
                user: "manish.singh19971@outlook.com",
                pass: "Manish@97"
            }
        });

        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Server validation done and ready for messages.')
            }
        });
        let output;
        if (req.body.emailType == "requestAccept") {
            output = `
            <h3>Congratulations your ride has been confirmed with ${req.body.name}</h3>
            
            `;
        }
        else if (req.body.emailType == "requestReject") {
            output = `
            <h3>Your ride has been rejected by ${req.body.name}</h3>
            
            `;
        }
        else {
            output = `
            <h3>${req.body.name} has requested you for a Ride</h3>
            <br>
            <p>Contact Number: <b>${req.body.mobileNo}</b></p>
            <p>Starting from: <b>${req.body.from}</b></p>
            <p>Ending to: <b>${req.body.to}</b></p>
            <p>Time of Ride: <b>${req.body.time}</b></p>
            <br>
            <br>
            <p><b>Note: Kinldy login to CT-CarPool and click view requested ride button to accept/reject the ride</b>
            `;
        }



        const email = {
            from: 'manish.singh19971@outlook.com',
            to: req.body.emailID,
            subject: 'Request Ride',
            html: output
        };

        transporter.sendMail(email, (error, success) => {
            if (error) {
                const resObjError = {
                    status: false,
                    message: 'something went wrong',
                    data: error
                }
                res.json(resObjError);
            } else {
                const resObjSuccess = {
                    status: true,
                    message: 'Request sent successfully through email',
                    data: success.response
                }
                res.json(resObjSuccess);
            }
        });

    } catch (error) {
        res.json('Error occured' + ' ' + error);
    }
});

module.exports = router;
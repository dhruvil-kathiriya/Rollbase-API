const manager = require("../../model/Manager/manager");
const admin = require("../../model/Admin/admin");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

module.exports.addmanager = async (req, res) => {
    try {
        console.log(req.body);
        if (req.body.password == req.body.cpass) {
            let checkEmail = await manager.findOne({ email: req.body.email });
            if (checkEmail) {
                return res.status(400).json({ msg: "Email Already Registered !", status: 0 });
            } else {

                var manager_pass = req.body.password;
                req.body.password = await bcrypt.hash(req.body.password, 10);
                let data = await manager.create(req.body);

                if (data) {

                    var comm = true;
                    if (comm) {
                        const transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 465,
                            secure: true,
                            auth: {
                                user: "clownfish156@gmail.com",
                                pass: "tkzxyfcpebsqihln",
                            },
                        });

                        // async..await is not allowed in global scope, must use a wrapper
                        async function main() {
                            // send mail with defined transport object
                            const info = await transporter.sendMail({
                                from: 'clownfish156@gmail.com', // sender address
                                to: `${req.body.email}`, // list of receivers
                                subject: "Your Registration Details", // Subject line
                                text: "Hello Manager ", // plain text body
                                html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                            <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                            
                            <head>
                                <meta charset="UTF-8">
                                <meta content="width=device-width, initial-scale=1" name="viewport">
                                <meta name="x-apple-disable-message-reformatting">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta content="telephone=no" name="format-detection">
                                <title></title>
                                <!--[if (mso 16)]>
                                <style type="text/css">
                                a {text-decoration: none;}
                                </style>
                                <![endif]-->
                                <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                                <!--[if gte mso 9]>
                            <xml>
                                <o:OfficeDocumentSettings>
                                <o:AllowPNG></o:AllowPNG>
                                <o:PixelsPerInch>96</o:PixelsPerInch>
                                </o:OfficeDocumentSettings>
                            </xml>
                            <![endif]-->
                                <!--[if !mso]><!-- -->
                                <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet">
                                <!--<![endif]-->
                            </head>
                            
                            <body>
                                <div dir="ltr" class="es-wrapper-color">
                                    <!--[if gte mso 9]>
                                        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                            <v:fill type="tile" color="#FF6E12"></v:fill>
                                        </v:background>
                                    <![endif]-->
                                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="esd-email-paddings" valign="top">
                                                    <table class="es-content esd-footer-popover" cellspacing="0" cellpadding="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-stripe" align="center">
                                                                    <table class="es-content-body" style="background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-structure es-p40" align="left">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td width="520" class="esd-container-frame" align="center" valign="top">
                                                                                                    <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fef852" style="background-color: #fef852; border-radius: 20px; border-collapse: separate;">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="center" class="esd-block-text es-p30t es-p10b es-p20r es-p20l">
                                                                                                                    <h1>Thank You<br>for Choosing Us</h1>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="center" class="esd-block-text es-p30b">
                                                                                                                    <p style="font-size: 16px;">for your needs!</p>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-structure es-p40b es-p40r es-p40l" align="left">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td width="520" class="esd-container-frame" align="center" valign="top">
                                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="left" class="esd-block-text es-p5t es-p5b">
                                                                                                                    <h3>Dear ${req.body.name},</h3>
                                                                                                                    <p><br>Your Email is : ${req.body.email} </p><p><br>Your Password is : ${manager_pass} </p>
                                                                                                                    <p>We just wanted to take a moment to thank you for choosing us for your   needs. We hope that you enjoyed   the service, and that we met your expectations.<br><br></p>
                                                                                                                    <p>If there's anything we can do to make your experience even better, please don't hesitate to let us know. We appreciate your feedback and are always looking for ways to improve.<br><br></p>
                                                                                                                    <p>Thank you again for your business. We look forward to serving you again soon!<br><br></p>
                                                                                                                    <p>Best regards,<br> Company</p>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </body>
                            
                            </html>`,
                            });
                        }
                        return res.status(200).json({ msg: "Manager registered Successfully & Email Has Been Sent to Manager", status: 1, rec: data });
                    }
                    else {
                        return res.status(400).json({ msg: "Manager is not registered", status: 0 });

                    }
                }
            }
        } else {
            console.log("password Does Not Match");
            return res.status(400).json({ msg: "password Does Not Match", status: 0 });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something Wrong!", status: 0 });
    }
}

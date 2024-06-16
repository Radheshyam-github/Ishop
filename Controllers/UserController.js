const { generateOTP } = require("../Helper");
const User = require("../Models/User");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
const nodemailer = require('nodemailer')
class UserController {
    async createAccount(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const user = await User.findOne({ email: data.email });
                    if (user != null) {
                        rej(
                            {
                                msg: "Email already exitsts",
                                status: 0
                            }
                        )
                    } else {
                        const userAccount = new User(
                            {
                                ...data,
                                password: cryptr.encrypt(data.password)
                            }
                        );
                        userAccount.save()
                            .then(
                                () => {
                                    res(
                                        {
                                            msg: "Account created ",
                                            status: 1,
                                            userAccount
                                        }
                                    )
                                }
                            ).catch(
                                (error) => {

                                    rej(
                                        {
                                            msg: "Unable to Create Account",
                                            status: 0
                                        }
                                    )
                                }
                            )
                    }
                } catch (error) {
                    rej(
                        {
                            msg: "Internal Server Error ",
                            status: 0
                        }
                    )
                }
            }
        )
    }
    login(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const user = await User.findOne({ email: data.email });
                    if (user != null) {
                        if (cryptr.decrypt(user.password) == data.password) {
                            res(
                                {
                                    msg: "Login Successfull",
                                    status: 1,
                                    user
                                }
                            )
                        } else {
                            rej(
                                {
                                    msg: "Invalid Password ",
                                    status: 0
                                }
                            )
                        }
                    } else {
                        rej(
                            {
                                msg: "Invalid Email ",
                                status: 0
                            }
                        )
                    }
                } catch (error) {
                    rej(
                        {
                            msg: "Internal Server Error ",
                            status: 0
                        }
                    )
                }
            }
        )
    }
    updateProfile(data) {
        return new Promise(
            (res, rej) => {
                console.log(data)
                try {
                    User.updateOne(
                        {
                            _id: data._id
                        },

                        {
                            name: data.name,
                            email: data.email,
                            contact: data.contact ?? null,
                            address: data.address ?? null
                        }
                    )
                        .then(
                            () => {
                                res(
                                    {
                                        msg: "profile Updated ",
                                        status: 1
                                    }
                                )
                            }
                        )
                        .catch(
                            () => {
                                rej(
                                    {
                                        msg: "Profile Not Updated ",
                                        status: 0
                                    }
                                )
                            }
                        )
                } catch (error) {
                    rej(
                        {
                            msg: 'Internal server Error',
                            status: 0
                        }
                    )
                }
            }
        )
    }

    sendOtp(email) {
        return new Promise(
            async (res, rej) => {
                try {
                    const user = User.findOne({ email: email })
                    if (user != null) {
                        const otp = generateOTP()
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.ethereal.email',
                            port: 587,
                            auth: {
                                user: 'eden20@ethereal.email',
                                pass: 'sgvsrWtq9SkD1UVnpG'
                            }
                        });
                        const message = {
                            from: "eden20@ethereal.email",
                            to: email,
                            subject: "Forget Password OTP ",
                            text: `Your otp is ${otp}`
                        }
                        transporter.sendMail(
                            message,
                            (err, info) => {
                                if (err) {
                                    rej(
                                        {
                                            msg: 'Unable to send OTp',
                                            status: 0
                                        }
                                    )
                                } else {
                                    User.updateOne({ email: email }, { forget_password_otp: otp })
                                        .then()
                                        .catch()
                                    res(
                                        {
                                            msg: "Otp Send",
                                            status: 1
                                        }
                                    )
                                }
                            }
                        )
                        // res(
                        //     {
                        //         msg: "Otp Genrate",
                        //         status: 1
                        //     }
                        // )
                    } else {
                        rej(
                            {
                                msg: 'Invalid Email Id',
                                status: 0
                            }
                        )
                    }
                } catch (error) {
                    rej(
                        {
                            msg: 'Internal server Error',
                            status: 0
                        }
                    )
                }
            }
        )
    }

    sendVerifyCode(email,otp) {
        return new Promise(
            (res, rej) => {
                try {
                    User.findOne({ email: email }, "forget_password_otp")
                    .then(
                        (x) => {
                            let forget_password_otp = 0
                            forget_password_otp = x.forget_password_otp
                            if (forget_password_otp) {
                                // console.log("forgot_password_otp",typeof forgot_password_otp)
                                // console.log("otp", typeof otp)
                                if (forget_password_otp === Number(otp)) {
                                    res({
                                        msg: "OTP verified",
                                        status: 1
                                    })
                                } else {
                                    // console.log("123")
                                    rej({
                                        msg: "Invalid OTP",
                                        status: 0
                                    })
                                }
                            } else {
                                rej({
                                    msg: "OTP Not Found",
                                    status: 0
                                })
                            }


                        }
                    )
                        .catch(
                            (err) => {

                                // console.log(err)
                            }
                        )
                } catch (error) {
                    rej(
                        {
                            msg: 'Internal server Error',
                            status: 0
                        }
                    )
                }
            }
        )
    }
}
module.exports = UserController;   
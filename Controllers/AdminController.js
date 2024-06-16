const Admin = require("../Models/Admin");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');


class AdminController {
    async createAccount(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const admin = await Admin.findOne({ email: data.email });
                    if (admin != null) {
                        rej(
                            {
                                msg: "Email already exitsts",
                                status: 0
                            }
                        )
                    } else {
                        const adminAccount = new Admin(
                            {
                                ...data,
                                password: cryptr.encrypt(data.password)
                            }
                        );
                        adminAccount.save()
                            .then(
                                () => {
                                    res(
                                        {
                                            msg: "Account created ",
                                            status: 1,
                                            adminAccount
                                        }
                                    )
                                }
                            ).catch(
                                (error) => {

                                    rej(
                                        {
                                            msg: "Unable to Create the Admin",
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
                    const admin = await Admin.findOne({ email: data.email });
                    if (admin != null) {
                        if (cryptr.decrypt(admin.password) == data.password) {
                            res(
                                {
                                    msg: "Login Successfull",
                                    status: 1,
                                    admin
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
}
module.exports = AdminController;   
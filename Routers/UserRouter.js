const express = require("express")

const UserController = require("../Controllers/UserController")

UserRouter = express.Router();

UserRouter.post(
    "/create-account",
    (req, res) => {
        const respose = new UserController().createAccount(req.body);
        respose.then(
            (sucesss) => {
                res.send(sucesss);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )

    }

)
UserRouter.post(
    "/login",
    (req, res) => {
        const respose = new UserController().login(req.body);
        respose.then(
            (sucesss) => {
                res.send(sucesss);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )

    }
)

UserRouter.patch(
    "/update-profile",
   
        (req, res) => {
            const respose=new UserController().updateProfile(req.body);
            respose.then(
                (sucesss)=>{
                    res.send(sucesss);
                }
            ).catch(
                (error)=>{
                    res.send(error)
                }
            )
        }
    
)
UserRouter.get(
    "/send-otp/:email",
    (req, res) => {
        const respose=new UserController().sendOtp(req.params.email);
        respose.then(
            (sucesss)=>{
                res.send(sucesss);
            }
        ).catch(
            (error)=>{
                res.send(error)
            }
        )
    }

)

UserRouter.get(
    "/verify-otp/:email/:otp",
    (req,res)=>{
        const respose=new UserController().sendVerifyCode(req.params.email,req.params.otp)
    respose.then(
        (sucesss)=>{
            res.send(sucesss);
        }
    ).catch(
        (error)=>{
            res.send(error);
        }
    )
    }
)
module.exports = UserRouter;
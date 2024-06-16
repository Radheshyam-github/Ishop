const express = require("express")
const Admin =require("../Models/Admin")
const AdminController = require("../Controllers/AdminController")

AdminRouter = express.Router();

AdminRouter.post(
    "/create-account",
    (req, res) => {
        const respose = new AdminController().createAccount(req.body);
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
AdminRouter.post(
    "/login",
   async (req, res) => {
        const admin=await Admin.find({email:data.email})
    if (admin==null) {
        rej(
            {
                msg:"Invaild Email",
                status:0
            }
        )
    }else{
        console.log(admin)
        res("hello")
    }
}

)

module.exports = AdminRouter;
const express = require("express");
const ColorController = require("../Controllers/ColorController")
const ColorRouter = express.Router();

ColorRouter.get(
    "/:id?",
    (req, res) => {
        const id = req.params.id;
        const result = new ColorController().get(id);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )

    });

ColorRouter.post(
    "/create",
    (req, res) => {
        // console.log(req.body)
        const result = new ColorController().create(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {


            }
        )
    }
);

ColorRouter.delete(
    "/delete/:id",
    (req, res) => {
        // console.log(success)
        const result = new ColorController().delete(req.params.id);
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error);

            }
        )
    }
)

ColorRouter.patch(
    "/change-status/:id/:new_Status",
    (req, res) => {
        // res.send("hello")
        const result = new ColorController().changeStatus(req.params.id, req.params.new_Status);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(success);

            }
        )
    }

);

ColorRouter.patch("/update/:id");


module.exports = ColorRouter;

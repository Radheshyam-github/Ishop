const express = require("express");
const CategoryController = require("../Controllers/CategoryController")
const CategoryRouter = express.Router();
const FileUpload = require('express-fileupload');
CategoryRouter.get(
    "/:id?",
    (req, res) => {
        const id = req.params.id;
        const result = new CategoryController().get(id);
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
    CategoryRouter.post(
    "/create",
    FileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const image = req.files.image;
        const result = new CategoryController().create(req.body, image);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }

);

CategoryRouter.delete(
    "/delete/:id",
        (req, res) => {
            const result = new CategoryController().delete(req.params.id);
            result.then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                }
            )
        }
    )


    CategoryRouter.patch(
    "/change-status/:id/:new_Status",
    (req, res) => {
        // console.log(req.params);
        // res.send("hello")
        const result = new CategoryController().changeStatus(req.params.id, req.params.new_Status);
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

CategoryRouter.patch(
    "/edit/:id",
    FileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const image = req.files?.image ??  null;
        // console.log(image)
        const result = new CategoryController().edit(req.params.id,req.body, image);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }

    );

module.exports = CategoryRouter;
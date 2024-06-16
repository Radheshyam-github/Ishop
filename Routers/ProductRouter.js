const express = require("express");
const ProductController = require("../Controllers/ProductController")
const   ProductRouter = express.Router();
const FileUpload = require('express-fileupload');
ProductRouter.get(
    "/:id?",
    (req, res) => {
        const id = req.params.id;
        const result = new ProductController().get(id,req.body);
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
    ProductRouter.post(
    "/create",
    FileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const image = req.files?.image ?? null;
        // console.log(image)
        const result = new ProductController().create(req.body, image);
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

ProductRouter.delete(
    "/delete/:id",
        (req, res) => {
            const result = new ProductController().delete(req.params.id);
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


    ProductRouter.patch(
    "/best-seller/:id/:new_Bestseller",
    (req, res) => {
        // console.log(req.params);
        // res.send("hello")
        const result = new ProductController().changeSeller(req.params.id, req.params.new_Bestseller);
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

ProductRouter.patch(
    "/edit/:id",
    FileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const image = req.files?.image ??  null;
        // console.log(image)
        const result = new ProductController().edit(req.params.id,req.body, image);
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

module.exports = ProductRouter;
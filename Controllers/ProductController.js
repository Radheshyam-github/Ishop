const Product = require("../Models/product");

class ProductController {
    get(id,filter=null) {
        return new Promise(
            async (res, rej) => {
                try {
                    let product = null;
                    if (id != null || id != undefined) {
                        product = await Product.findById(id);
                    } else {
                        product = await Product.find();
                    }
                    res(
                        {
                            msg: "product Found",
                            status: 1,
                            product,
                            baseUrl: "http://localhost:5000/Uploads/Product/"
                        }
                    )
                } catch (error) {
                  
                    rej(
                        {
                            msg: "Internal Server Error",
                            status: 0,
                            error
                        }
                    )
                }

            }
        )
    }
    create(data, file) {
        return new Promise(
            (res, rej) => {
                try {
                    const imageName = new Date().getTime() + Math.floor(Math.random() * 10000) + file.name;
                    const destination = "./Public/Uploads/Product/" + imageName;
                   
                    file.mv(
                        destination,
                        (err) => {
                            if (err) {
                                rej(
                                    {
                                        Status: 0,
                                        msg: "Unable to File Upload"
                                    }
                                )
                            } else {
                                data.image = imageName
                                const product = new Product(data);
                                
                                product.save()
                                    .then(
                                        (success) => {
                                            res(
                                                {
                                                    msg: "Product added",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (error) => {
                                           
                                            rej(

                                                {
                                                    msg: "Unable to add Product",
                                                    status: 0,
                                                    error
                                                }
                                            )
                                        }
                                    )
                            }
                        }
                    )

                } catch (error) {
              
                    rej(
                        {
                            msg: "Internal Server Error",
                            status: 0
                        }
                    )
                }
            }
        )
    }
    changeSeller(id, bestseller) {
        return new Promise(
            (res, rej) => {
                try {
                    Product.updateOne(
                        { _id: id },
                        { bestseller }
               

                    )
                    .then(
                        (success)=>{
                            // console.log(success.data)
                            res(
                                {
                                    msg:"Bast Seller Changed",
                                    best_seller:1,

                                }
                            )
                        }
                    ) .catch(
                        (error)=>{

                            rej(
                                {
                                    msg:"Unable to change Bast Seller",
                                    best_seller:0
                                }
                            )
                        }
                    )
                } catch (error) {
                    rej(
                        {
                            msg:"Internal Server Error ",
                            best_seller:0,
                            error
                        }
                    )
                }
            }
        )
    }
    delete(id) {
   
        return new Promise(
            (res, rej) => {
                try {
                    Product.deleteOne(
                        { _id: id }
                        )
                        .then(
                            (success) => {
                                res({
                                    msg: "Product deleted",
                                    status: 1
                                })
                            }
                        )
                        .catch(
                            (error) => {
                                rej(
                                    {
                                        msg: "Product Not Delete",
                                        status: 0
                                    }
                                )
                            }
                        )
                } catch (error) {
                console.log(error)
                    rej(
                        {
                            meg: "Internal Server Error",
                            status: 0
                        }
                    )
                }
            }
        )
    }
    edit(id, data, file) {
        return new Promise(
            (res, rej) => {
                try {
                    if (file != null) {
                        const imageName = new Date().getTime() + Math.floor(Math.random() * 10000) + file.name;
                        const destination = "./Public/Uploads/Product/" + imageName;
                        file.mv(
                            destination,
                            (err) => {
                                if (!err) {
                                    Product.updateOne(
                                        { _id: id },
                                        {
                                            name: data.name,
                                            slug: data.slug,
                                            image: imageName
                                        }
                                    ).then(
                                        (success) => {
                                            res(
                                                {
                                                    msg: "Product Update",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (error) => {
                                            rej(
                                                {
                                                    msg: "Product not Update",
                                                    status: 0
                                                }
                                            )
                                        }
                                    )
                                } else {

                                }
                            }
                        )
                    } else {
                        Product.updateOne(
                            { _id: id },
                            {
                                name: data.name,
                                slug: data.slug
                            }
                        ).then(
                            (success) => {
                                res(
                                    {
                                        msg: "Data Update",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                rej(
                                    {
                                        msg: "Data not Update",
                                        status: 0
                                    }
                                )
                            }
                        )
                    }
                } catch (error) {
                    rej(
                        {
                            msg: "Internal Server Error"
                        }
                    )
                }
            }
        )
    }
}
module.exports = ProductController;
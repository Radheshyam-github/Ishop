const Category = require("../Models/Category");
// const Product = require("../Models/Product");
class CategoryController {
    get(id) {
        return new Promise(
            async (res, rej) => {
                try {
                    let category = null;
                    if (id != null || id != undefined) {
                        category = await Category.findById(id);
                    } else {
                        category = await Category.find();
                    }
                    // category =await Promise.all(
                    //     category.map(
                    //         async  (cat)=>{
                    //             const count =await Product.countDocuments({category_id:cat._id});
                    //             return{
                    //                 ...cat.toJSON(),count
                    //             }
                    //         }
                    //     )
                    // )
                    res(
                        {
                            msg: "Data Found",
                            status: 1,
                            category,
                            baseUrl: "http://localhost:5000/Uploads/Category/"
                        }
                    )
                } catch (error) {
                    console.log(error)
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
                    const destination = "./Public/Uploads/Category/" + imageName;
                    // console.log(destination)
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
                                const category = new Category(data);
                                category.save()
                                    .then(
                                        (success) => {
                                            res(
                                                {
                                                    msg: "Category added",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (error) => {

                                            rej(

                                                {
                                                    msg: "Unable to add category",
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

    changeStatus(id, status) {
        return new Promise(
            (res, rej) => {
                try {
                    Category.updateOne(
                        { _id: id },
                        { status }

                    )
                        .then(
                            (success) => {
                                res(
                                    {
                                        msg: "Status Changed",
                                        status: 1

                                    }
                                )
                            }
                        ).catch(
                            (error) => {

                                rej(
                                    {
                                        msg: "Unable to change Status",
                                        status: 0
                                    }
                                )
                            }
                        )
                } catch (error) {
                    rej(
                        {
                            msg: "Internal Server Error ",
                            status: 0,
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
                    Category.deleteOne(
                        { _id: id }
                    )
                        .then(
                            (success) => {
                                res({
                                    msg: "Category delete",
                                    status: 1
                                })
                            }
                        )
                        .catch(
                            (error) => {
                                rej(
                                    {
                                        msg: "Category Not Delete",
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
                        const destination = "./Public/Uploads/Category/" + imageName;
                        file.mv(
                            destination,
                            (err) => {
                                if (!err) {
                                    Category.updateOne(
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
                                                    msg: "Category Update",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (error) => {
                                            rej(
                                                {
                                                    msg: "Category not Update",
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
                        Category.updateOne(
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
module.exports = CategoryController;
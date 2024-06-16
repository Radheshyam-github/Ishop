const Color = require("../Models/Color");

class ColorController {
    get(id) {
        return new Promise(
            async (res, rej) => {
                try {
                    let color = null;
                    if (id != null || id != undefined) {
                        color = await Color.findById(id);
                    } else {
                        color = await Color.find();
                    }
                    res(
                        {
                            msg: "color Found",
                            status: 1,
                            color
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

    create(data) {
        // console.log(data)
        return new Promise(
            (res, rej) => {
                try {
                    const color = new Color(data);
                    color.save()
                    // console.log(data)
                        .then(
                            (success) => {
                                res(
                                    {
                                        msg: "Color Added ",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                rej(
                                    {
                                        msg: " Unable to Color Added  ",
                                        status: 1
                                    }
                                )
                            }
                        )
                } catch (error) {
                    rej(
                        {
                            msg: "Internal Server Error ",
                            status: 1
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
                    Color.updateOne(
                        { _id: id },
                        { status }
                    )
                    .then(
                        (success)=>{
                            res(
                                {
                                    msg:"Status Changed",
                                    status:1
                                }
                            )
                        }
                    ) .catch(
                        (error)=>{
                            
                            rej(
                                {
                                    msg:"Unable to change Status",
                                    status:0
                                }
                            )
                        }
                    )
                } catch (error) {
                    rej(
                        {
                            msg:"Internal Server Error ",
                            status:0,
                            error
                        }
                    )
                }
            }
        )
    }
    delete(id) {
        console.log(id)
        return new Promise(
            (res, rej) => {
                try {
                    Color.deleteOne(
                        { _id: id }
                        )
                        .then(
                            (success) => {
                                res({
                                    msg: "Color deleted",
                                    status: 1
                                })
                            }
                        )
                        .catch(
                            (error) => {
                                rej(
                                    {
                                        msg: "Color Not Delete",
                                        status: 0
                                    }
                                )
                            }
                        )
                } catch (error) {
                    // console.log(error)
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
}
module.exports = ColorController;
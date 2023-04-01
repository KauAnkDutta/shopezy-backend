const Order = require('../model/orderModel')


const orderCtrl = {

    createOrder: async(req, res) => {
        try {
            const userId = req.user.id;
            // const {order} = req.body
            const orders = await Order.findOne({userId: userId})

            if(orders){
                req.body.map(async(item) => {
                    await Order.findOneAndUpdate({userId: userId}, {
                        "$push":{
                            orders: {
                                ...item
                            }
                        }
                    })
                })

                res.status(200).json({upatedOders: orders})

            }else{
                const orders = Order({
                    userId: userId,
                    orders: req.body
                })

                await orders.save()

                res.status(200).json({myOrder: orders})
            }
        } catch (error) {
            res.status(500).json({msg: "someThing is Wrong"})
        }
    },

    getOrder: async(req, res) => {
        try {
            const userId = req.user.id;
            const userOrder = await Order.findOne({userId: userId})
            if(userOrder){
                res.status(200).json({orders: userOrder.orders})
            }
        } catch (error) {
            res.status(500).json({msg: "Bad Request"})
        }
    }
}

module.exports = orderCtrl;


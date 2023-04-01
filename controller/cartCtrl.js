const Cart = require('../model/testModel')

const cartCtrl = {
    createCart: async(req, res) => {
        try {
            const userId = req.user.id;
            const existing_cart = await Cart.findOne({userId: userId})

            if(existing_cart){
                res.status(200).json("cart exist")
            }else{
                const newCart = Cart({
                    userId: userId,
                })
                
                await newCart.save()
                res.status(200).json(newCart)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    updateCart: async(req, res) => {
        try {
            const userId = req.user.id;

            const existing_cart = await Cart.findOne({userId: userId})

            const id = req.body.products.id

            const itemAdded = existing_cart.products.find(obj => obj.id == id)
            if(itemAdded){
                await Cart.updateOne({userId: userId, "products.id": id},{
                    $set:{
                        "products.$.quantity": itemAdded.quantity + req.body.products.quantity
                    }
                })

                res.status(200).json("Product has been updated")

            }else{
                await Cart.findOneAndUpdate({userId: userId},{
                    $push: {products: req.body.products}
                })
                    
                res.status(200).json({msg:"new product added"})
            }

        } catch (error) {
            res.status(500).json({msg: "Request can't be completed"})
        }
    },

    removeItems: async(req, res) => {
        try {
            const id = req.body.products.id;
            const userId = req.user.id;
            if(id){
                await Cart.updateOne({userId: userId}, {
                    $pull:{
                        products: {id: id}
                    }
                })
            }

            res.status(200).json({msg: "Item removed successfully"})
        } catch (error) {
            res.status(500).json({msg: "Invalid Action"})
        }
    },

    resetTheCart: async(req, res) => {
        try {
            const userId = req.user.id;
            await Cart.updateOne({userId: userId},{
                $pull:{
                    products: {$exists: true}
                }
            })

            res.status(200).json({msg: "Reset Complete"})
        } catch (error) {
            res.status(500).json({msg:"Invalid Action"})
        }
    },
    
    getItems: async(req, res) => {
        try {
            const userId = req.user.id;
            const userCart = await Cart.findOne({userId: userId})

            if(userCart){
                res.status(200).json({items: userCart.products})
            }
        } catch (error) {
            res.status(200).json("Invalid request")
        }
    }


}

module.exports = cartCtrl;


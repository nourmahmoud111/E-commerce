 import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { bootstrap } from './src/modules/bootstrap.js'
import { globalError } from './src/middleware/globalError.js'
import { appERROR } from './src/utils/appError.js'
import cors from 'cors'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51RLXxPRoY4Gd0hYBoUhyhohwc4oD7ioRc7PMApLvYAjpgxHGoYrBmo7e6Pn8JfyAEIB1vPfINx9G5clsjtdlfnrF00EXJWGJYS');
import'dotenv/config'
import { catchError } from './src/middleware/catchError.js'
import { Order } from './database/models/order.model.js'
import { User } from './database/models/user.model.js'
import { Cart } from './database/models/cart.model.js'
import { Product } from './database/models/product.model.js'


const app = express()
const port = process.env.PORT || 3000


app.post('/api/webhook', express.raw({type: 'application/json'}),catchError(async(req, res) => {
    const sig = req.headers['stripe-signature'].toString()
    let event = stripe.webhooks.constructEvent(req.body, sig ,"whsec_vHGcz0QJgJkXw9cLCrQO32Y50Gn54VBr")
    let checkout
    if(event.type=="checkout.session.completed"){
         checkout = event.data.object;



         let user =await User.findOne({email: checkout.customer_email})
            let cart =  await Cart.findById(checkout.client_reference_id)
            if(!cart) return next(new appERROR('cart not found', 404))
            let order = new Order ({
                user: user._id,
                orderItems: cart.cartItems,
                shippingAddress:checkout.metadata,
                totalOrderPrice:checkout.amount_total/100,
                paymentType:'card',
                isPaid:true,
            })
        
        await order.save()
        let options = cart.cartItems.map((prod)=>{
            return (   {
                updateOne:{
                    'filter':{_id: prod.product },
                    'update':{ $inc :{sold : prod.quantity, stock : -prod.quantity}}
                }
            })
        })
        await Product.bulkWrite(options)
        await Cart.findByIdAndDelete(cart._id)
        


    }
    res.json({message:'success',checkout});
  }));




app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))
bootstrap(app)


app.use('*',(req,res,next) =>{
    next(new appERROR(`route not found ${req.originalUrl}`,404))
})

app.use(globalError)



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
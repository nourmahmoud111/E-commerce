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


const app = express()
const port = process.env.PORT || 3000


app.post('/api/webhook', express.raw({type: 'application/json'}),catchError((req, res) => {
    const sig = req.headers['stripe-signature'].toString()
    let event = stripe.webhooks.constuctEvent(req.body, sig ,"whsec_vHGcz0QJgJkXw9cLCrQO32Y50Gn54VBr")
    let checkout
    if(event.type=="checkout.session.completed"){
         checkout = event.data.object;
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
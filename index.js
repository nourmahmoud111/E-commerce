 import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { bootstrap } from './src/modules/bootstrap.js'
import { globalError } from './src/middleware/globalError.js'
import { appERROR } from './src/utils/appError.js'
import cors from 'cors'
import'dotenv/config'


const app = express()
const port = process.env.PORT || 3000
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
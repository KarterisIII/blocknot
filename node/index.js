import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from './router/index.js'
import errorMiddleware from './middlewares/error-middleware.js'
import corsOptions from './config/corsOptions.js';

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('', router)
app.use(errorMiddleware)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)
		.then(() => {
			console.log('DB ok')
		})
		app.listen( PORT, () => console.log(`Server start on port = ${PORT}`))
	} catch (error) {
		console.log(error)
	}
}

start()
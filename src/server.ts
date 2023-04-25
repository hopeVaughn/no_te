import express, { Request, Response, NextFunction } from 'express';
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { protect } from './handlers/modules/auth'
import { createNewUser, signin } from './handlers/user'
const app = express();

//--MiddleWare
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//--End of MiddleWare

app.get('/', (req, res) => {
  console.log('hello from express');
  res.status(200)
  res.json({ message: "hello" })
})

app.use('/api', protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'Invalid User' });
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'Invalid Input' });
  } else {
    res.status(500).json({ message: 'Server Error' });
  }
});


export default app
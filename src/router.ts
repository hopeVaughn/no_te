import { Router } from "express";
const router = Router();

/*
* Todos
 */
router.get('/todo', (req, res) => {
  res.json({ message: 'heya pal!' })
})
router.get('/todo/:id', () => { })
router.put('/todo/:id', () => { })
router.post('/todo', () => { })
router.delete('/todo/:id', () => { })

export default router
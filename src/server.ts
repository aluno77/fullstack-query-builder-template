import express, { Request, Response } from 'express'
import { knexInstance } from './database/knex'

const app = express()
app.use(express.json())

app.post('/courses', async (request: Request, response: Response) => {
  const { name } = request.body
  await knexInstance('courses').insert({ name })
  // await knexInstance.raw('INSERT INTO courses (name) VALUES (?)', [name])

  response.status(201).json()
})

app.get('/courses', async (request: Request, response: Response) => {
  const courses = await knexInstance('courses').select('*').orderBy('name')
  // const courses = await knexInstance.raw('SELECT * FROM courses')
  return response.json(courses)
})

app.put('/courses/:id', async (request: Request, response: Response) => {
  const { name } = request.body
  const { id } = request.params

  await knexInstance('courses').update({ name }).where({ id })
  // await knexInstance.raw('UPDATE courses SET name = ? WHERE id = ?', [name, id])
  return response.json()
})

app.delete('/courses/:id', async (request: Request, response: Response) => {
  const { id } = request.params

  await knexInstance('courses').delete().where({ id })
  // await knexInstance.raw('DELETE FROM courses WHERE id = ?', [id])
  return response.json()
})

app.listen(3333, () => console.log(`Server is running on port 3333`))

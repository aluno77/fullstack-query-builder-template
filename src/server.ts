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

app.post('/modules', async (request: Request, response: Response) => {
  const { name, course_id } = request.body

  await knexInstance('course_modules').insert({ name, course_id })

  response.status(201).json()
})

app.get('/modules', async (request: Request, response: Response) => {
  const modules = await knexInstance('course_modules').select('*')

  return response.json(modules)
})

app.get('/courses/:id/modules', async (request: Request, response: Response) => {
  const courses = await knexInstance('courses')
    .select(
      'courses.id AS course_id',
      'course_modules.id AS course_module_id',
      'course_modules.name AS module',
      'courses.name AS course'
    )
    .join('course_modules', 'courses.id', 'course_modules.course_id')

  return response.json(courses)
})


app.listen(3333, () => console.log(`Server is running on port 3333`))

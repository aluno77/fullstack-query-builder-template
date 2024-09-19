import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    await knex('courses').insert([
        { name: 'Css' },
        { name: 'Java' },
        { name: 'Html' },
        { name: 'Node js' },
        { name: 'Express' },
        { name: 'Rect Js' },
        { name: 'Next js' },
        { name: 'Git' },
        { name: 'Banco de dados' },
    ])
}

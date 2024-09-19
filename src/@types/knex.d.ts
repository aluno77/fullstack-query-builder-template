import { Knex as knexConfig } from 'knex'

declare module 'knex' {
  namespace Knex {
    interface QueryInterface {
      customSelect<TRecord, TResult>(
        value: number,
      ): knexConfig.QueryBuilder<TRecord, TResult>
    }
  }
}

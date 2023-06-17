import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user'  , table => {
        table.bigInteger('user_id', ).primary()
        table.string('email').unique().notNullable()
        table.string('password').notNullable()
        table.date('create_on').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {

    return knex.schema.dropTable('user')
}


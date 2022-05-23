
import { Knex } from "knex";

console.log(process.env.NODE_ENV)
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tm_details', table => {
        table.increments().primary()
        table.integer('page_no').notNullable()
        table.string('trademark').notNullable()
        table.text('details').notNullable()
        table.string('tm_phonetics').notNullable()
        table.integer('tm_class').notNullable()
        table.integer('journal_no').notNullable()
        
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tm_details')
}


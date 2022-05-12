
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tm_details', table => {
        table.primary(['trademark', 'tm_class'])
        table.increments()
        table.integer('page_no').notNullable()
        table.string('trademark').notNullable()
        table.text('details').notNullable()
        table.string('tm_phonetics').notNullable()
        table.integer('tm_class').notNullable()
        table.integer('journal_no').notNullable()
        table.index(['trademark', 'tm_phonetics'], 'tm-phonetic-index')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tm_details')
}


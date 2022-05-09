
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tm_details', table => {
        table.increments()
        table.string('page_no')
        table.string('trademark')
        table.text('details')
        table.string('tm_phonetics')
        table.integer('tm_class')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tm_details')
}


import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tm_detail', (table) => {
        table.increments()
        table.integer('page_no').notNullable()
        table.string('trademark').notNullable()
        table.text('details')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tm_detail')
} 


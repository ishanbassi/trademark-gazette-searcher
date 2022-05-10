import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('tm_details', table => {
        table.integer('journal_no')
    }) 
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('tm_details', table => {
        table.dropColumn('journal_no')
    })
}


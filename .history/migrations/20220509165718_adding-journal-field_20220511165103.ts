import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('tm_detail', table => {
        table.integer('journal_no')
    }) 
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('tm_detail', table => {
        table.dropColumn('journal_no')
    })
}


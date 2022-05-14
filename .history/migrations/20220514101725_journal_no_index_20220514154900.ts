import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_details', table => {
        table.index('journal_no', 'journal-index')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_details', table => {
        table.dropIndex('journal_no', 'journal-index')
    })
}


import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_details', table => {
        table.index(['tm_class', 'journal_no', 'trademark', 'tm_phonetics'], 'trademark-index')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_details', table => {
        table.dropIndex(['tm_class', 'journal_no', 'trademark', 'tm_phonetics'], 'trademark-index')
    })
}


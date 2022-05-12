import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_details', table => {
        table.index(['trademark', 'tm_phonetics', 'tm_class'])
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_details', table => {
        table.dropIndex('tm_class')
    })
}


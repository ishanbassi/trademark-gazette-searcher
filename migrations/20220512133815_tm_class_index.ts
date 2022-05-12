import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_details', table => {
        table.index('tm_class', 'tm-class-index')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_details', table => {
        table.dropIndex('tm-class-index')
    })
}


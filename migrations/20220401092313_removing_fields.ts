import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_detail', table => {
        table.dropColumn('application_no')
        table.dropColumn('application_date')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('tm_detail',table => {
        table.integer('application_no')
        table.string('application_date')
    })
}


import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.table("tm_detail", (table) => {
        table.integer('tm_class')
        table.integer('application_no')
        table.date('application_date')
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.table('tm_detail', table => {
        table.dropColumn('tm_class')
        table.dropColumn('application_no')
        table.dropColumn('application_date')
    })
}


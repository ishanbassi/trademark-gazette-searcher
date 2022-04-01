import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('tm_detail' , table => {
        table.string('tm_class').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('tm_detail', table => {
        table.dropColumn('tm_class')
    })
}


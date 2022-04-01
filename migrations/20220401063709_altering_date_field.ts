import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_detail', table => {
        table.string('application_date').alter({alterType:true})
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_detail', table => {
        table.date('application_date').alter({alterType:true})
    })
}


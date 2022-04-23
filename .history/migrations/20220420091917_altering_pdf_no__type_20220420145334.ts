
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_detail', table => {
        table.string('page_no').alter({alterType:true})
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_detail', table => {
        table.integer('page_no').alter({alterType:true})
    })
}


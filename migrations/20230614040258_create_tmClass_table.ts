import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tm_class', table =>{
        table.integer('class')
        .primary()
        .notNullable()
        .unique()
        .checkBetween([1,45])
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("tm_class")
}


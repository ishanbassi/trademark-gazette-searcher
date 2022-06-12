import { Knex } from "knex";
console.log(process.env.NODE_ENV)

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_details', table => {
        table.index('tm_class', 'tm-class-index')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_details', table => {
        table.dropIndex('tm_class' ,'tm-class-index')
    })
}


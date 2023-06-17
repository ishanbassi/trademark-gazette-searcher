import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('journal', table => {
        table.integer('journal_no').notNullable().primary().unique()
        table.date('pub_date').notNullable();

        table.index('pub_date', 'idx_journal')
        
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('journal')
}


import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tm_application', table => {
        table.integer('application_no').notNullable().primary().unique()
        table.date('application_date').notNullable()

        table.index(['application_no', 'application_date'], 'idx_tm_application')
        
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tm_application');
}



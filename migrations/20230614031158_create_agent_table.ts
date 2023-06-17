import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('agent', table => {
        table.increments('agent_id', {primaryKey:true})
        table.string('agent_name').notNullable()
        table.text('agent_address').notNullable()

        table.index(['agent_name', 'agent_address'], 'idx_agent')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('agent');
}



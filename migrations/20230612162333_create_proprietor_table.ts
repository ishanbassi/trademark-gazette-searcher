import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('proprietor', table => {
        table.increments('prop_id', {primaryKey:true})
        table.string('prop_name').notNullable()
        table.text('prop_address').notNullable()

        table.index(['prop_name', 'prop_address'],'idx_prop')

        
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('proprietor');
}



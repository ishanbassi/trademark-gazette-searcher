import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reg_tm', table => {
        table.increments('tm_id', {primaryKey:true})
        table.string('trademark')

        table.text('img_url')

    
        table.text('details')

        table.bigInteger('user_id')
            .references('user_id')
            .inTable('user')
        
        table.integer('agent_id')
            .references('agent_id')
            .inTable('agent')
        
        table.integer('proprietor_id')

            .references('agent_id')
            .inTable('agent')

        table.integer('application_no')
            
            .references('application_no')
            .inTable('tm_application')

        table.integer('class')
            .notNullable()
            .references('class')
            .inTable('tm_class')

        table.integer('journal_no')
            
            .references('journal_no')
            .inTable('journal')

        

        

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("reg_tm")
}


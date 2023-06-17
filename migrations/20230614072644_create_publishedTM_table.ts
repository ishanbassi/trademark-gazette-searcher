import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('pub_tm', table => {
        table.increments('tm_id', {primaryKey:true})
        table.string('trademark')
        table.integer('page_no')
        table.text('img_url')
        table.string('usage')
            .notNullable()
        table.string('head_office')
            .notNullable()
            .checkIn(['MUMBAI', 'AHMEDABAD', 'DELHI', 'KOLKATA', 'CHENNAI'])

        table.text('details').notNullable()
        table.string('associated_tms')
        table.integer('agent_id')
            .references('agent_id')
            .inTable('agent')
        
        table.integer('proprietor_id')
            .notNullable()
            .references('agent_id')
            .inTable('agent')

        table.integer('application_no')
            .notNullable()
            .references('application_no')
            .inTable('tm_application')

        table.integer('class')
            .notNullable()
            .references('class')
            .inTable('tm_class')

        table.integer('journal_no')
            .notNullable()
            .references('journal_no')
            .inTable('journal')

        

        

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("pub_tm")
}


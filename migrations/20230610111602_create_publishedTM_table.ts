
import { Knex } from "knex";

console.log(process.env.NODE_ENV)
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tm_details', table => {
        table.increments().primary()
        table.integer('page_no').notNullable()
        table.string('trademark')
        table.text('details').notNullable()
        table.string('tm_phonetics')
        table.integer('tm_class').notNullable()
        table.integer('journal_no').notNullable()
        table.integer("application_no").notNullable()
        table.date('application_date').notNullable()
        table.string('associated_tms')
        table.string('proprietor_name').notNullable()
        table.text('proprietor_addresss').notNullable()
        table.string('agent_name')
        table.text('agent_address')
        table.string('head_office')
                .notNullable()
                .checkIn(['MUMBAI', 'AHMEDABAD', 'DELHI', 'KOLKATA', 'CHENNAI'])

        table.string('img_url')
        table.string('usage')
                    .notNullable()
                    




        table.index(['tm_class', 'journal_no', 'trademark', 'tm_phonetics'], 'trademark-index')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tm_details')
}


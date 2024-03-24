import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('trademarks', table => {
        table.increments().primary()
        table.string('trademark')
        table.text('details')
        table.integer("application_no")
        table.date('application_date')
        table.string('associated_tms')
        table.string('proprietor_name')
        table.text('proprietor_addresss')
        table.string('agent_name')
        table.text('agent_address')
        table.string('head_office')
            .checkIn(['MUMBAI', 'AHMEDABAD', 'DELHI', 'KOLKATA', 'CHENNAI'])
        table.string('img_url')
        table.string('usage')
        table.index(['trademark'], 'user-tm-index')

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("reg_tm")
}


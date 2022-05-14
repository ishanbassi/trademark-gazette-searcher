import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    
    return knex.schema.alterTable("tm_detail", (table) => {
      table.string("tm_phonetics").alter({alterType:true})
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tm_detail', table => {
        table.json('tm_phonetics').alter({alterType:true})
    })
}


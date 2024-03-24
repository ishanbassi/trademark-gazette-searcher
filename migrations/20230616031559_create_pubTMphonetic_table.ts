import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('pubtm_phonetic', table => {
        table.increments('phonetic_id', {primaryKey:true})
        table.integer('tm_id')
            .notNullable()
            .references('id')
            .inTable('published_tms')
            .onDelete('CASCADE')
        table.string('sanitized_tm').notNullable()
        table.string('phonetic_pk').notNullable()
        table.string('phonetic_sk').notNullable()
        table.integer('tm_class').notNullable()
        table.integer('journal_no').notNullable()

        table.index(['journal_no','tm_class','phonetic_pk', 'phonetic_sk'], 'idx_pub_phonetic')
        
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('pubtm_phonetic')
}


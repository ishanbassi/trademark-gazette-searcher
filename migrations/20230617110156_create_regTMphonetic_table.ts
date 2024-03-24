import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('trademarks_phonetic', table => {
        table.increments('phonetic_id', {primaryKey:true})
        table.integer('tm_id')
            .notNullable()
            .references('id')
            .inTable('trademarks')
            .onDelete('CASCADE')
        table.string('sanitized_tm').notNullable()
        table.string('phonetic_pk').notNullable()
        table.string('phonetic_sk').notNullable()
        table.integer('tm_class').notNullable()
        table.integer('journal_no')

        table.index(['journal_no','tm_class','phonetic_pk', 'phonetic_sk'], 'user-tm-phn-idx')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('regtm_phonetic')
}


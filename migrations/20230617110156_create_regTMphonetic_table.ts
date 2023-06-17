import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('regtm_phonetic', table => {
        table.increments('phonetic_id', {primaryKey:true})
        table.integer('tm_id')
            .notNullable()
            .references('tm_id')
            .inTable('reg_tm')
            .onDelete('CASCADE')
        table.string('sanitized_tm').notNullable()
        table.string('phonetic_pk').notNullable()
        table.string('phonetic_sk').notNullable()

        table.index(['phonetic_pk', 'phonetic_sk'], 'idx_reg_phonetic')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('regtm_phonetic')
}


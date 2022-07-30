import { Knex } from "knex";

let tmTable = process.env.NODE_ENV == "production" ? "tm_details" : "tm_detail"
console.log(tmTable)
export async function up(knex: Knex): Promise<void> {
    return knex.schema.table(tmTable, table => {
        table.binary('image')
    } )
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table(tmTable, table => {
        table.dropColumn('image')
    })
}


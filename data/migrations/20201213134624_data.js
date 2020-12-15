
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments()
        table.string("user_name",128).notNullable().unique()
        table.string("first_name",128).notNullable();
        table.string("last_name",128).notNullable();
        table.string("picture",358).notNullable();
        table.string("password",128).notNullable();
        table.string("email",128).unique()
        table.string("facebook_email",128).unique()
        table.string("google_email",128).unique()
        table.integer("google_id",128).unique()
        table.integer("facebook_id",128).unique()

      })
      .createTable('fav_movies', function (table) {
        table.increments()
        table.integer("user_id",128).notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        table.integer("google_user_id",128)
        .unsigned()
        .references("google_id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        table.integer("facebook_user_id",128)
        .unsigned()
        .references("facebook_id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        table.integer("movie_id",128).notNullable()
      })
};

exports.down = function(knex) {
  
};

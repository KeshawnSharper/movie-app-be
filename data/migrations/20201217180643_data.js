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
        table.string("title",128).notNullable();
        table.string("poster_path",400).notNullable();
        table.integer("vote_average",128).notNullable();
        table.string("overview").notNullable();
        table.string("release_date",128).notNullable();
        table.integer("movie_id",128).notNullable()
      })
      .createTable('recommended_movies', function (table) {
        table.increments()
        table.integer("user_id",128).notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        table.string("title",128).notNullable();
        table.string("poster_path",400).notNullable();
        table.integer("vote_average",128).notNullable();
        table.string("overview").notNullable();
        table.string("release_date",128).notNullable();
        table.integer("movie_id",128).notNullable()
        table.integer("recommended_movie_id",128).notNullable()
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
    .dropTableIfExists("fav_movies")
    .dropTableIfExists("recommended_movies")
};
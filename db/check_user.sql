-- This query is used to check whether or not a user is in the database. This is used in both register and login handler functions. Register uses it to make sure the user trying to register is not already in the database, and login uses it to make sure that the user trying to login is in the database.
select * from users
where email = $1;
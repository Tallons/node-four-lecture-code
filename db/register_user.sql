--This query will add a new user to the database, and is only used in the register handler function. It will add the users email and the hashed password to the database.
insert into users (
    email,
    password
) values (
    ${email},
    ${password}
)
returning user_id, email;

-- insert into users (
--     email,
--     password
-- ) values (
--     $1,
--     $2
-- );
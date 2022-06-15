create table
`recipes` (
    `id` int unsigned not null auto_increment primary key,
    `created_at` timestamp not null default CURRENT_TIMESTAMP,
    `recipe_name` varchar(255) null unique,
    `recipe_description` varchar(255) null
);

insert into recipes (recipe_name, recipe_description)
values ('Garlic Potatoes', 'Fluffy Garlic Potatoes');
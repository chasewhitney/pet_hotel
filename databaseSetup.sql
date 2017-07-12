CREATE TABLE owners (
	id SERIAL PRIMARY KEY,
	first_name varchar(30) not null,
	last_name varchar(50) not null
);

CREATE TABLE pets (
	id SERIAL PRIMARY KEY,
	name varchar(30) not null,
	breed varchar(50) not null,
	color varchar(30) not null,
	owner_id int REFERENCES owners
);

CREATE TABLE visits (
 id SERIAL PRIMARY KEY,
 check_in_date date not null,
 check_out_date date,
 pet_id int REFERENCES pets
);

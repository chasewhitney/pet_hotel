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
 check_in_date date DEFAULT NULL,
 check_out_date date DEFAULT NULL,
 pet_id int REFERENCES pets
);

--Dummy data setup

INSERT INTO owners
VALUES (1, 'Bill', 'Jenkins');

INSERT INTO owners
VALUES (2, 'Susan', 'Boyle');

INSERT INTO pets
VALUES (1, 'Sparky', 'black lab', 'black', 1), (2, 'Barksy', 'poodle', 'white', 2);

INSERT INTO visits ("pet_id")
VALUES (1), (2);

SELECT owner_id, pet_id, first_name, last_name, name, breed, color, check_in_date, check_out_date from owners
JOIN pets on pets.owner_id = owners.id
JOIN visits on pets.id = visits.pet_id;

<<<<<<< HEAD
CREATE TABLE
    person (
               id SERIAL PRIMARY KEY,
               name VARCHAR(255),
               surname VARCHAR(255),
               login VARCHAR(255),
               password VARCHAR(255)
);

CREATE TABLE
    ingredients (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);

CREATE TABLE
    recipes (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                person_id INTEGER NOT NULL,
                FOREIGN KEY (person_id) REFERENCES person (id) ON DELETE CASCADE
);

CREATE TABLE
    recipe_ingredients (
                           recipe_id INTEGER,
                           ingredient_id INTEGER,
                           PRIMARY KEY (recipe_id, ingredient_id),
                           FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE,
                           FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE
);

CREATE TABLE
    recipe_types (
                     id SERIAL PRIMARY KEY,
                     type_name VARCHAR(255) NOT NULL,
                     description TEXT
=======
CREATE TABLE person (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255),
                        surname VARCHAR(255),
                        login VARCHAR(255),
                        password VARCHAR(255)
);

CREATE TABLE ingredients (
                             id SERIAL PRIMARY KEY,
                             name VARCHAR(255) NOT NULL
);

CREATE TABLE recipes (
                         id SERIAL PRIMARY KEY,
                         title VARCHAR(255) NOT NULL,
                         content TEXT NOT NULL,
                         person_id INTEGER NOT NULL,
                         FOREIGN KEY (person_id) REFERENCES person (id) ON DELETE CASCADE
);

CREATE TABLE recipe_ingredients (
                                    recipe_id INTEGER,
                                    ingredient_id INTEGER,
                                    PRIMARY KEY (recipe_id, ingredient_id),
                                    FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE,
                                    FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE
);

CREATE TABLE recipe_types (
                              id SERIAL PRIMARY KEY,
                              type_name VARCHAR(255) NOT NULL,
                              description TEXT
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
);

ALTER TABLE recipes
    ADD COLUMN type_id INTEGER,
ADD FOREIGN KEY (type_id) REFERENCES recipe_types (id) ON DELETE SET NULL;

<<<<<<< HEAD
INSERT INTO
    recipe_types (type_name, description)
VALUES
    (
        'First course',
        '"First course" includes various soups, broths, and light appetizers that not only warm the soul but also stimulate the appetite.'
    ),
    (
        'Second course',
        'The second course is the foundation of a hearty meal. These are meat, fish, or vegetable dishes that provide energy and a feeling of satisfaction after eating.'
    ),
    (
        'Dessert',
        'Dessert is the sweet finale of a culinary journey. Cakes, pies, pastries, and other treats create unforgettable moments of pleasure for all sweet lovers.'
    ),
    (
        'Drink',
        'Drinks are a complement to any dish. They can be hot, cold, refreshing, or invigorating, enhancing flavors and adding completeness to the meal.'
    );

INSERT INTO
    ingredients (name)
=======
-- Insert default recipe types
INSERT INTO recipe_types (type_name, description)
VALUES
    (
        'First Course',
        '"First Course" includes various soups, broths, and light appetizers that not only warm the soul but also stimulate the appetite.'
    ),
    (
        'Main Course',
        'The main course is the heart of a hearty meal. These are meat, fish, or vegetable dishes that provide energy and a sense of satisfaction after eating.'
    ),
    (
        'Dessert',
        'Dessert is the sweet finale of a culinary journey. Cakes, pies, pastries, and other treats create unforgettable moments of joy for sweet lovers.'
    ),
    (
        'Drink',
        'Drinks complement any meal. They can be hot, cold, refreshing, or invigorating, enhancing the flavors and completing the dining experience.'
    );

-- Initial ingredients
INSERT INTO ingredients (name)
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
VALUES
    ('Potato'),
    ('Carrot'),
    ('Onion'),
    ('Tomato'),
    ('Cucumber'),
    ('Water'),
    ('Tea'),
    ('Lemon');

<<<<<<< HEAD
=======
-- Add creation_date and cooking_time to recipes
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
ALTER TABLE recipes
    ADD COLUMN creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE recipes
    ADD COLUMN cooking_time INTEGER;

<<<<<<< HEAD
INSERT INTO
    ingredients (name)
=======
-- Additional ingredients
INSERT INTO ingredients (name)
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
VALUES
    ('Basil'),
    ('Garlic'),
    ('Mushrooms'),
<<<<<<< HEAD
    ('Sour cream'),
    ('Chicken fillet'),
=======
    ('Sour Cream'),
    ('Chicken Fillet'),
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
    ('Milk'),
    ('Honey'),
    ('Flour'),
    ('Sugar'),
<<<<<<< HEAD
    ('Rice');

CREATE TABLE
    person_ingredients (
                           person_id INTEGER,
                           ingredient_id INTEGER,
                           PRIMARY KEY (person_id, ingredient_id),
                           FOREIGN KEY (person_id) REFERENCES person (id) ON DELETE CASCADE,
                           FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE
);

-- milka changes
ALTER TABLE person
    ALTER COLUMN name
        SET
        NOT NULL,
ALTER COLUMN surname
SET
  NOT NULL,
ALTER COLUMN login
SET
  NOT NULL,
ALTER COLUMN password
SET
  NOT NULL,
  ADD CONSTRAINT unique_login UNIQUE (login);

--! i lovvvveeee youuuu <3
-- !!!!! kuisanchik <3
-- Creating table for units of measurement
CREATE TABLE
    unit_measurement (
                         id SERIAL PRIMARY KEY,
                         unit_name VARCHAR(255) NOT NULL, -- Name of the unit
                         coefficient DOUBLE PRECISION -- Conversion coefficient to grams, NULL if not applicable
);

-- Filling unit_measurement table with basic units
INSERT INTO
    unit_measurement (unit_name, coefficient)
VALUES
    ('gram', 1),
    ('kilogram', 1000),
    ('milliliter', 1),
    ('liter', 1000),
    ('teaspoon', 5),
    ('tablespoon', 15),
    ('cup', 250),
    ('piece', NULL);

-- "Piece" without conversion to grams
-- Adding new field to ingredients to store id_unit_measurement
-- Default value 1 (grams)
ALTER TABLE ingredients
    ADD COLUMN id_unit_measurement INTEGER NOT NULL DEFAULT 1,
ADD CONSTRAINT fk_unit_measurement FOREIGN KEY (id_unit_measurement) REFERENCES unit_measurement (id) ON DELETE RESTRICT;

-- Adding new field to recipe_ingredients for quantity
-- Default value — 1
ALTER TABLE recipe_ingredients
    ADD COLUMN quantity_recipe_ingredients DOUBLE PRECISION NOT NULL DEFAULT 1;

-- Example of updating existing data:
-- For certain ingredients set "piece"
UPDATE ingredients
SET
    id_unit_measurement = (
        SELECT
            id
        FROM
            unit_measurement
        WHERE
            unit_name = 'piece'
    )
WHERE
    name IN ('Potato', 'Onion', 'Egg', 'Lemon');

-- Adding unique constraint on name field in ingredients
ALTER TABLE ingredients ADD CONSTRAINT unique_name UNIQUE (name);

-- Adding new ingredients to ingredients table
INSERT INTO
    ingredients (name)
VALUES
    ('Cheese'),
    ('Pepper'),
    ('Pasta'),
    ('Olive oil') ON CONFLICT (name) DO NOTHING;

-- Updating unit measurements for existing ingredients
UPDATE ingredients
SET
    id_unit_measurement = 1
WHERE
    name IN (
             'Tomato',
             'Cheese',
             'Basil',
             'Chicken',
             'Garlic',
             'Salt',
             'Pepper',
             'Pasta',
             'Olive oil',
             'Carrot',
             'Cucumber',
             'Water',
             'Tea'
        );

UPDATE ingredients
SET
    id_unit_measurement = 8
WHERE
    name IN ('Potato', 'Onion', 'Lemon');

-- Adding field quantity_person_ingradient of type INTEGER
ALTER TABLE person_ingredients
    ADD COLUMN quantity_person_ingradient INTEGER NOT NULL DEFAULT 1;
CREATE TABLE
    menu_category (
                      menu_category_id SERIAL PRIMARY KEY,
                      category_name VARCHAR(50) NOT NULL,
                      category_description TEXT
);

-- Table for storing the menu itself
CREATE TABLE
    menu (
             menu_id SERIAL PRIMARY KEY,
             menu_title VARCHAR(100) NOT NULL,
             menu_content TEXT,
             category_id INT,
             person_id INT,
             FOREIGN KEY (category_id) REFERENCES menu_category (menu_category_id),
             FOREIGN KEY (person_id) REFERENCES person (id) -- Replace with correct column name if needed
);

-- Linking table between menu and recipes
CREATE TABLE
    menu_recipe (
                    menu_recipe_id SERIAL PRIMARY KEY,
                    menu_id INT,
                    recipe_id INT,
                    FOREIGN KEY (menu_id) REFERENCES menu (menu_id),
                    FOREIGN KEY (recipe_id) REFERENCES recipes (id)
);

INSERT INTO
    menu_category (category_name, category_description)
VALUES
    (
        'Breakfast',
        'Dishes for the morning meal that provide energy for the whole day.'
    ),
    ('Lunch', 'Hearty dishes for the midday meal'),
    (
        'Dinner',
        'Light or nourishing dishes for the evening meal'
    );

ALTER TABLE menu_recipe ADD CONSTRAINT fk_menu_id FOREIGN KEY (menu_id) REFERENCES menu (menu_id) ON DELETE CASCADE;

--! andey 30.11 lybyyy
ALTER TABLE ingredients
    ADD COLUMN allergens VARCHAR(255),
ADD COLUMN days_to_expire INTEGER,
ADD COLUMN seasonality VARCHAR(255),
ADD COLUMN storage_condition VARCHAR(255);

-- Example updates for ingredients:

UPDATE ingredients
SET
    allergens = 'Eggs',
    days_to_expire = 7,
    seasonality = 'All seasons',
    storage_condition = '+4 - +8°C'
WHERE
    id = 1;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = NULL,
    seasonality = 'All seasons',
    storage_condition = 'Dry place, room temperature'
WHERE
    id = 2;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = 30,
    seasonality = 'Summer, Autumn',
    storage_condition = 'Dry place, room temperature'
WHERE
    id = 3;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = 180,
    seasonality = 'All seasons',
    storage_condition = '+4 - +20°C'
WHERE
    id = 4;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = 90,
    seasonality = 'Autumn, Winter',
    storage_condition = '+4 - +8°C'
WHERE
    id = 5;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = 60,
    seasonality = 'Autumn, Winter',
    storage_condition = '+4 - +8°C'
WHERE
    id = 6;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = 120,
    seasonality = 'All seasons',
    storage_condition = '+4 - +8°C'
WHERE
    id = 7;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = 10,
    seasonality = 'Summer, Autumn',
    storage_condition = '+4 - +8°C'
WHERE
    id = 8;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = 7,
    seasonality = 'Summer',
    storage_condition = '+4 - +8°C'
WHERE
    id = 9;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = NULL,
    seasonality = 'All seasons',
    storage_condition = 'Room temperature'
WHERE
    id = 10;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = NULL,
    seasonality = 'All seasons',
    storage_condition = 'Dry place, room temperature'
WHERE
    id = 11;

UPDATE ingredients
SET
    allergens = 'Citrus',
    days_to_expire = 20,
    seasonality = 'Winter, Spring',
    storage_condition = '+4 - +8°C'
WHERE
    id = 12;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = 7,
    seasonality = 'Summer',
    storage_condition = '+4 - +8°C'
WHERE
    id = 13;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = 180,
    seasonality = 'All seasons',
    storage_condition = '+4 - +8°C'
WHERE
    id = 14;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = 5,
    seasonality = 'Autumn',
    storage_condition = '+4 - +8°C'
WHERE
    id = 15;

UPDATE ingredients
SET
    allergens = 'Dairy',
    days_to_expire = 10,
    seasonality = 'All seasons',
    storage_condition = '+4 - +8°C'
WHERE
    id = 16;

UPDATE ingredients
SET
    allergens = 'Poultry',
    days_to_expire = 3,
    seasonality = 'All seasons',
    storage_condition = '+4 - +8°C'
WHERE
    id = 17;

UPDATE ingredients
SET
    allergens = 'Dairy',
    days_to_expire = 7,
    seasonality = 'All seasons',
    storage_condition = '+4 - +8°C'
WHERE
    id = 18;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = NULL,
    seasonality = 'All seasons',
    storage_condition = 'Dry place, room temperature'
WHERE
    id = 19;

UPDATE ingredients
SET
    allergens = 'Gluten',
    days_to_expire = 180,
    seasonality = 'All seasons',
    storage_condition = 'Dry place, room temperature'
WHERE
    id = 20;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = NULL,
    seasonality = 'All seasons',
    storage_condition = 'Dry place, room temperature'
WHERE
    id = 21;

UPDATE ingredients
SET
    allergens = 'None',
    days_to_expire = 365,
    seasonality = 'All seasons',
    storage_condition = 'Dry place, room temperature'
WHERE
    id = 22;

ALTER TABLE recipes ADD servings VARCHAR(255);

ALTER TABLE person_ingredients ADD purchase_date DATE DEFAULT CURRENT_DATE;
CREATE TABLE
    ingredient_purchases (
                             id SERIAL PRIMARY KEY,
                             person_id INTEGER NOT NULL,
                             ingredient_id INTEGER NOT NULL,
                             quantity DOUBLE PRECISION NOT NULL,
                             purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             FOREIGN KEY (person_id) REFERENCES person (id) ON DELETE CASCADE,
                             FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE
);

ALTER TABLE ingredient_purchases
DROP CONSTRAINT IF EXISTS quantity;

ALTER TABLE ingredient_purchases
    ALTER COLUMN quantity SET DEFAULT 0;

ALTER TABLE ingredient_purchases
    ALTER COLUMN quantity SET NOT NULL;
=======
    ('Rice');
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d

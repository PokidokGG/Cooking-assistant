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
);

ALTER TABLE recipes
    ADD COLUMN type_id INTEGER,
ADD FOREIGN KEY (type_id) REFERENCES recipe_types (id) ON DELETE SET NULL;

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
VALUES
    ('Potato'),
    ('Carrot'),
    ('Onion'),
    ('Tomato'),
    ('Cucumber'),
    ('Water'),
    ('Tea'),
    ('Lemon');

-- Add creation_date and cooking_time to recipes
ALTER TABLE recipes
    ADD COLUMN creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE recipes
    ADD COLUMN cooking_time INTEGER;

-- Additional ingredients
INSERT INTO ingredients (name)
VALUES
    ('Basil'),
    ('Garlic'),
    ('Mushrooms'),
    ('Sour Cream'),
    ('Chicken Fillet'),
    ('Milk'),
    ('Honey'),
    ('Flour'),
    ('Sugar'),
    ('Rice');
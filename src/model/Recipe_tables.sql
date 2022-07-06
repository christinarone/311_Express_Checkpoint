-- -----------------------------------------------------
-- Table `recipes`.`ingredients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipes`.`ingredients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ingredient` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `ingredient_UNIQUE` (`ingredient` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `recipes`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipes`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_index_2` (`user_name` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `recipes`.`recipes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipes`.`recipes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `recipe_name` VARCHAR(255) NULL DEFAULT NULL,
  `recipe_description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `recipe_name` (`recipe_name` ASC) VISIBLE,
  INDEX `user_id_FK_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id_FK`
    FOREIGN KEY (`user_id`)
    REFERENCES `recipes`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table `recipes`.`instructions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipes`.`instructions` (
  `recipe_id` INT NOT NULL,
  `steps` INT NOT NULL,
  `description` VARCHAR(1000) NOT NULL,
  INDEX `instructions_recipe_relation` (`recipe_id` ASC) VISIBLE,
  CONSTRAINT `instructions_recipe_relation`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipes`.`recipes` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table `recipes`.`measurements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipes`.`measurements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `measurement` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`));
  
-- -----------------------------------------------------
-- Table `recipes`.`recipe_ingredients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipes`.`recipe_ingredients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `recipe_id` INT NOT NULL,
  `ingredient_id` INT NOT NULL,
  `amount` INT NULL DEFAULT NULL,
  `measurement_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `recipe_id_FK_idx` (`recipe_id` ASC) VISIBLE,
  INDEX `ingredient_id_FK_idx` (`ingredient_id` ASC) VISIBLE,
  INDEX `measurement_id_FK_idx` (`measurement_id` ASC) VISIBLE,
  CONSTRAINT `ingredient_id_FK`
    FOREIGN KEY (`ingredient_id`)
    REFERENCES `recipes`.`ingredients` (`id`),
  CONSTRAINT `measurement_id_FK`
    FOREIGN KEY (`measurement_id`)
    REFERENCES `recipes`.`measurements` (`id`),
  CONSTRAINT `recipe_id_FK`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipes`.`recipes` (`id`));

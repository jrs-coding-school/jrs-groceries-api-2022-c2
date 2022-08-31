DROP SCHEMA IF EXISTS `grocery-shopper`;

CREATE SCHEMA `grocery-shopper`;

CREATE TABLE `grocery-shopper`.`products` (
    `id` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `price` FLOAT NOT NULL,
   
    `category` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `image` VARCHAR(255) NULL,
    
    PRIMARY KEY (`id`)
);


CREATE TABLE `grocery-shopper`.`users` (
    `id` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `grocery-shopper`.`transactions` (
    `id` VARCHAR(50) NOT NULL UNIQUE,
    `customer_id` VARCHAR(50) NOT NULL,
    `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `total` FLOAT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`)
);

CREATE TABLE `grocery-shopper`.`purchased_items` (
    `id` VARCHAR(50) NOT NULL UNIQUE,
    `product_id` VARCHAR(50) NOT NULL,
    `quantity` INT NOT NULL,
    `transaction_id` VARCHAR(50) NOT NULL,
    `total` FLOAT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`),
    FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`)
);

DROP TABLE IF EXISTS `grocery-shopper`.`cart_items`;

CREATE TABLE `grocery-shopper`.`cart_items` (
    `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
    `customer_id` VARCHAR(50) NOT NULL,
    `product_id` VARCHAR(50) NOT NULL,
    `quantity` INT NOT NULL,
    `total` FLOAT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`),
    FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);


INSERT INTO
    `grocery-shopper`.`products` (
        `id`,
        `name`,
        `price`,
        `category`,
        `brand`,
        `description`,
        `image`
    )

-- VALUES for products.. ex. milk, meats, crackers


INSERT INTO `grocery-shopper`.`users` (
    `id`,
    `email`,
    `password`
)

-- VALUES for users

INSERT INTO `grocery-shopper`.`cart_items` (`customer_id`, `product_id`, `quantity`, `total`) 

-- VALUES ('customer_id', 'product_id', 'quantity', 'total')


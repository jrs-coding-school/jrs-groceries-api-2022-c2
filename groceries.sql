DROP SCHEMA IF EXISTS `grocery-shopper`;

CREATE SCHEMA `grocery-shopper`;

CREATE TABLE `grocery-shopper`.`products` (
    `id` INT NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `price` FLOAT NOT NULL,
    `size` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(255),
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
    `product_id` INT NOT NULL,
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
    `product_id` INT NOT NULL,
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
        `size`,
        `brand`,
        `description`,
        `image`
)
-- VALUES for products.. ex. milk, meats, crackers

VALUES 
    -- Dairy & Eggs (100)
    (101,'2 % Milk', 3.62, 'Dairy & Eggs', '1 Gallon', 'Great Value', 'Grade A gallon of 2% milk', 'https://i5.walmartimages.com/asr/b8cd5dd9-eb4c-44f8-84c5-6c3fa0ade504_2.b93305e90bf7f66b9ab5f36f25652660.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (102,'2 % Milk', 2.16, 'Dairy & Eggs', '0.5 Gallon', 'Great Value', 'Grade A  1/2 gallon of 2% milk', 'https://i5.walmartimages.com/asr/670fdbc0-a12a-493e-a0d1-5e1fff84e200_1.c1a08125c47d543ab975f0c484225aaa.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (103,'Whole Milk', 3.62, 'Dairy & Eggs', '1 Gallon', 'Great Value', 'Grade A, Vitamin D enriched whole milk', 'https://i5.walmartimages.com/asr/83f533c3-3234-4bea-80bf-a0f9a43cd279_2.9b223f40bab27c513ba64f9f0e3fc2d9.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (104,'Whole Milk', 2.16, 'Dairy & Eggs', '0.5 Gallon', 'Great Value', 'Grade A, Vitamin D enriched whole milk', 'https://i5.walmartimages.com/asr/1347c2ba-9373-463d-8714-c678a6949090_2.f72cceb2686f8ea62c4d647f5fa4ee68.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (105,'Salted Butter', 5.48, 'Dairy & Eggs', '1 lb', 'Land O Lakes', "It's the original sweet cream butter made with farm fresh milk that never lets your taste buds down", 'https://i5.walmartimages.com/asr/b9b4f43f-4196-4dff-b57b-95dbb62a3f0b.1c1ada1966c023180cbaffa2e4a8560a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (106,'Large Cage Free Brown Eggs', 3.42, 'Dairy & Eggs', '12ct', 'Marketside', 'When you want a quality product at a great price, choose Marketside Cage Free Large Brown Eggs', 'https://i5.walmartimages.com/asr/b95c5b36-e474-4063-99a8-b7334c965228_1.cdbbf124259b17bbba8e4da078f08c00.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    
  
    -- Fruit(200)
    (201,'Granny Smith Apple', 2.50, 'Fruit', 'Price per pound', 'FWD', 'Grown in Washington', 'https://i5.walmartimages.com/asr/bf2ec88a-2f36-41f2-93d3-c3161772733d_1.cdc913433c6acc6bf9201dc1fa86bac9.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (202,'Banana', 0.39, 'Fruit', 'Price per unit', 'FWD', 'Grown in Guatemala', 'https://www.instacart.com/image-server/932x932/filters:fill(FFF,true):format(webp)/www.instacart.com/assets/domains/product-image/file/large_d85da0df-7f4a-4a8c-b066-b7bbfd871f70.jpg'),
    (203,'Navel Orange', 0.93, 'Fruit', 'Price per unit', 'FWD', 'Grown in Florida', 'https://i5.walmartimages.com/asr/9a23bac1-8817-4845-b235-36e306bd76a1_1.2f100cb67c81b17a44fedcf1f5d9f9da.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (204,'Strawberries, 1lb', 2.38, 'Fruit', 'Price per package', 'FWD', 'Grown in Mexico', 'https://i5.walmartimages.com/asr/4e7dab6a-c54b-48f7-9bd2-57f5d211501d_1.3ba50bfdf1c7f082056c0f5022edf182.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (205,'Cantaloupe', 2.68, 'Fruit', 'Price per unit', 'FWD', 'Grown in Mexico', 'https://i5.walmartimages.com/asr/57107e37-f5e0-4a96-94c1-bdc57e35a700.561733d0ae224238174cb295a9a35d94.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (206,'Lemon', 0.62, 'Fruit', 'Price per unit', 'FWD', 'Grown in Florida', 'https://i5.walmartimages.com/asr/c87d84c4-081a-475a-8c75-9e7f23a4fbaf.54f94b1123a7b9ca9867f7e51004cbef.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
  
    -- Vegetable(300)
    (301,'English Seedless Cuccumber', 2.77, 'Vegetable', 'Price per unit', 'FWD', 'Grown in Peru', 'https://www.producemarketguide.com/sites/default/files/seedless-cucumber_variety-page.png' ),
    (302,'Red Bell Pepper', 2.29, 'Vegetable', 'Price per unit', 'FWD', 'Grown in Mexico', 'https://i5.walmartimages.com/asr/7be94a8e-9a5d-4f87-842f-5fe4084138ba.c95d36e140f5e0d492ca632b42e4543c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (303,'Green Cabbage', 2.04, 'Vegetable', 'Price per pound', 'FWD', 'Grown in California', 'https://i5.walmartimages.com/asr/8856d6af-c1b7-4561-9e3d-dd0263fbb09a_1.1ecdda0a8faa0ed27be3f4a87153a0a5.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF' ),
    (304,'Broccoli Crowns', 2.32, 'Vegetable', 'Price per pound', 'FWD', 'Grown in California', 'https://i5.walmartimages.com/asr/c721459d-3826-4461-9e79-c077d5cf191e_3.ca214f10bb3c042f473588af8b240eca.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF' ),
    (305,'Romaine Lettuce Hearts', 2.98, 'Vegetable', '3 pk', 'FWD', 'Grown in California', 'https://i5.walmartimages.com/asr/d475f905-b33a-4532-b50f-684f1408cd5f_1.d52e53ac0b69935c2079124ce3ca3036.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF' ),
    (306,'Green Onions, Bunch', 0.48, 'Vegetable', 'Price per unit', 'FWD', 'Grown in California', 'https://i5.walmartimages.com/asr/5af56fe3-27ea-4c78-9d3f-74f0fdecfcff_1.1f4e7886b6e329ccb374d9e3fa675e45.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF' ),
  
    -- Meat & Seafood(400)
    (401,'Chicken Breast', 12.29, 'Meat & Seafood', 'Price per package', "Pilgrim's", 'Boneless, Skinless, Grade A Chicken Breast', 'https://partners.pilgrimsusa.com/media/1318/152829_skless_breast_tray3_Packaged%20Image.png'),
    (402,'Ground Beef', 4.96, 'Meat & Seafood', 'Price per pound', "Great Value", 'All Natural* 80% Lean/20% Fat Ground Beef Chuck Tray, 1 lb', 'https://i5.walmartimages.com/asr/becdc204-72d5-43a7-82e4-dc4ecc751c46.6abc698327fdda741d04c20f1457ea88.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (403,'Pork Tenderloin', 4.17, 'Meat & Seafood', 'Price per pound', "Smithfield", 'This pork loin is dry rubbed with seasoning and topped with crumbled applewood smoked bacon for mouthwatering flavor', 'https://i5.walmartimages.com/asr/6afcb693-eca3-4dfb-9cd9-e79e3d6e0063.5be5764f74019c5bd21d6898fb13777f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
  
    -- Frozen(500)
    (501,'Digiorno Supreme Pizza', 9.99, 'Frozen', 'Price per package', 'Digiorno', 'Classic rising crust supreme pizza', 'https://images.heb.com/is/image/HEBGrocery/001728297?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0'),
    (502,'Eggo Frozen Waffles', 2.82, 'Frozen', 'Box of 10', "Kellog's", 'Eggo Frozen Waffles, Homestyle, 12.3 Oz, Box of 10, Frozen', 'https://i5.walmartimages.com/asr/11785cd6-df49-4e71-b5c0-f6d4df4ec5ef.6317f4968ef216550bd180b9459e11be.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (503,"Cookies n' Cream Ice Cream", 4.84, 'Frozen', '48 fluid oz', "Tillamook", "Tillamook Cookies and Cream Ice Cream is made creamier, which means Tillamook uses more cream than we're required. It is also made with premium ingredients that never contain artificial flavors or preservatives", 'https://i5.walmartimages.com/asr/38624082-5119-4db8-8024-7658d9885577.f54dcfedb3f031b5c9e9fa9dfe8056ba.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    
    -- Bakery(600)
    (601,'4 pk Croissants', 4.98, 'Bakery', 'Package of 4', 'Marketside', '4 pack of all butter, curved croissants', 'https://i5.walmartimages.com/asr/080de50b-3056-4b75-aac4-467152f94940.8a16deb4729a5dc819cf634ee0327031.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (602,'12 pk Chocolate Chip Cookies', 2.58, 'Bakery', 'Package of 12', 'Marketside', 'Our Freshness Guaranteed Chocolate Chip Cookies 11 oz are soft cookies made with real chocolate chips.', 'https://i5.walmartimages.com/asr/9eb34325-5491-415f-b2ae-06f0c45c8d9e.09d93360d449a0c6e3e93fc416cc5bb3.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (603,'French Baguette', 1.97, 'Bakery', '10 oz', 'Marketside', 'Freshly made bread in the comfort of your own home in only minutes', 'https://i5.walmartimages.com/asr/b5f13a65-29f7-424d-a9a7-1071d0ab3831_1.a9e72c79b1b364704c763f5cc14ec2d0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    
    -- Beverages(700)
    (701,'12 pk Cherry Coke Zero', 7.79, 'Beverages', '12 x 12oz cans', 'Coca-cola', '12 pack of 12oz cans of sugar free, zero calorie cherry flavored cola', 'https://i5.walmartimages.com/asr/38b6cc9d-36eb-453d-9482-dba92157c87d.7743f99555f53922e92e147284414e4b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (702,'24 pk Perrier Carbonated Mineral Water', 33.17, 'Beverages', '24 x 16.9 fluid oz bottles', 'Perrier', 'Our invigorating bubbles and naturally occurring minerals make for a unique, thirst quenching taste', 'https://i5.walmartimages.com/asr/7ac508e2-9c0b-409c-94d9-c65b42203f39_1.3b20a4cb599d1adafef2aa57ae3d262c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (703,'AHA Sparkling Water, Watermelon + Lime', 3.38, 'Beverages', '8 x 12 fluid oz bottles', "AHA", "Whether you call it seltzer, carbonated water, or fizzy beverage, AHA's bold flavor pairings offer a unique flavored sparkling water experience unlike all the rest", 'https://i5.walmartimages.com/asr/265ac0f9-393c-424c-976e-b0dfd45ac131.7caf2c2988a97c018c626293a862df11.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
   
    -- Snacks & Candy(800)
    (801,'Harvest Cheddar Sun Chips', 3.93, 'Snacks & Candy', '7 oz bag', 'Sun Chips', 'The flavor of real cheddar cheese is layered onto a delicious whole grain chip to create this tasty combination.','https://i5.walmartimages.com/asr/f388b632-e225-47b2-9f4b-b388c6ce88aa.6eac267c9ca4eee25d1e225cc121929c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (802,'Smartfood White Cheddar', 3.68, 'Snacks & Candy', '6.75 oz bag', 'Smartfood', 'White cheddar popcorn so good you will have a hard time stopping snack time','https://i5.walmartimages.com/asr/994bc3b2-b818-45a6-935a-11c3e5664868.b08c2f8be8b5bd73ec493fad5e613fdf.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (803,'Ritz Crackers', 2.68, 'Snacks & Candy', '13.7 oz box', 'Nabisco', 'Flaky and delicious snack crackers with a rich, buttery flavor','https://i5.walmartimages.com/asr/e81f0519-3070-4352-b6cf-815395167489.4fac87c723c0e126517fa3cd032d57f2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    
    -- Deli(900)
    (901,'Roast Beef', 15.19, 'Deli', 'Price per pound', "Boar's Head", 'We coat our top round beef with salt, pepper, and garlic and then oven-roast it until tender and delicious.','https://cutpcdnwimages.azureedge.net/images/products/95000/099436-600x600-A.jpg' ),
    (902,'Pepper Jack', 12.00, 'Deli', 'Price per pound', "Boar's Head", "Blended with zesty red and green jalapeño peppers and aged to perfection, this buttery, slightly tart, semi-soft Monterey Jack cheese packs a flavorful punch. Boar's Head Jalapeño Pepper Jack Cheese is produced in the U.S. with whole cow's milk",'https://www.instacart.com/image-server/932x932/filters:fill(FFF,true):format(webp)/www.instacart.com/assets/domains/product-image/file/large_8bb877bb-b6bc-43af-b408-5c75a8568296.jpg' ),
    (903,'Pasta Salad', 8.85, 'Deli', 'Price per pound', 'FWD Deli', "Bowtie pasta salad, with feta, pesto, and olives",'https://www.instacart.com/image-server/514x514/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_d122444f-c6ab-43e7-a0cc-46ca35c7b341.JPG' ),
   
    -- Dry Goods(1000)
    (1001,'Spaghetti', 2.29, 'Dry Goods', '1 lb box', 'Barilla', 'Made with 100% durum wheat and purified water to deliver great taste and "al dente" texture every time', 'https://i5.walmartimages.com/asr/aa3b1c08-653d-4df0-ba14-610dd4848494.2a5df53882f3a47a5b0da04b39c5c30e.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (1002,'Basmati Rice', 4.64, 'Dry Goods', '2 lb bag', 'Mahatma', 'Mahatma Basmati White Rice is a premium, quality long grain rice so it cooks up with a fluffy texture and a nutty, subtle floral aroma that is perfect for a wide variety of dishes', 'https://i5.walmartimages.com/asr/a6d0738d-e24e-47f1-b83d-8230ca3a539d.334432fb14c5e590a320bcb48599abf7.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (1003,'Unbleached All-Purpose Flour', 4.48, 'Dry Goods', '5 lb bag', 'King Arthur', 'Milled from select 100% American wheat. Never bleached. Never bromated', 'https://i5.walmartimages.com/asr/86d409f3-89b6-48ac-92ce-ef098341e507.19aa1cc0a75e8712baebd0a5d1718017.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
   
    -- Condiments & Sauces(1100)
    (1101,'Organic Ketchup', 2.82, 'Condiments & Sauces', '14oz', 'Heinz', 'Heinz Organic Tomato Ketchup is made with vine-ripened certified organic tomatoes and features the same thick and rich taste as the classic Heinz ketchup', 'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/718vqdnNghL._SL1500_.jpg'),
    (1102,'Ranch', 4.88, 'Condiments & Sauces', '24oz', 'Hidden Valley', 'Americas favorite ranch is now even creamier and thicker, making it the perfect condiment for dipping, dunking or drizzling with pizza, wings and more', 'https://i5.walmartimages.com/asr/1bd75296-46fb-4934-849b-5151280f8b78.7926e6b5e517907cc8fa30fc71681f34.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (1103,'Sriracha', 3.62, 'Condiments & Sauces', '17oz', 'Huy Fong', 'Delicious and versatile chili sauce', 'https://i5.walmartimages.com/asr/e40098b0-d901-4f7f-898b-fe56765534d8_1.5873c88d78e5575d04967239db114cd7.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    
    -- Canned Goods(1300)
    (1201,'Chicken Noodle Soup', 1.39, 'Canned Goods', '10.75 oz', "Campbell's", '10.75 ounce can of hearty chicken broth with white chicken meat, noodles, and vegetables','https://i5.walmartimages.com/asr/1b6212f6-a8cb-4f0e-8342-22ef28ead599.7a93ed034efca03d14769e9117a79059.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (1202,'Crushed Tomatoes', 2.18, 'Canned Goods', '28 oz', "Cento", 'Cento All Purpose Crushed Tomatoes are made with vine-ripened tomatoes. They are picked and processed quickly in order to preserve their fresh flavor','https://i5.walmartimages.com/asr/00c1107f-0181-4de8-bf96-54723d808e75_1.f31fe920f47eb06345974b6f2a1e368a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (1203,'Sliced Peaches', 2.28, 'Canned Goods', '15 oz', "Del Monte", 'One 15 oz can of DEL MONTE Yellow Cling Sliced Peaches in 100% Juice','https://i5.walmartimages.com/asr/304c61b4-7cb8-44d7-ada9-240da2210029.d5268e52ad41c35392615a8bd0f09652.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    
    -- Household(1300)
    (1301,'Disinfecting Wipes', 4.20, 'Household', '80 wipes', 'Lysol', 'Lysol Disinfecting Wipes can be used as a convenient way to clean and disinfect your household surfaces. Each pre-moistened disposable disinfecting wipe kills 99.9% of germs when used as directed', 'https://i5.walmartimages.com/asr/0491c0a8-642e-4da2-a9bf-52171845c39a.198a21e203ab556ab3ee43f0d99568d4.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (1302,'Febreze Air Freshener', 5.44, 'Household', '2 pk of 8.8 fluid oz', 'Febreze', 'Eliminates air odors without masking, leaving nothing behind but a light, fresh scent', 'https://i5.walmartimages.com/asr/4a5eaa4e-2b21-4120-9527-9642d5e36571.defcc66820dda66ada4177dadf783b13.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (1303,'Cottonelle Ultra Comfort Toilet Paper', 6.98, 'Household', '6 pk', 'Cottonelle', '6 Mega Rolls of Cottonelle Ultra Comfort Toilet Paper (6 Mega Rolls = 24 regular rolls*), 268 sheets per roll—packaging may vary from what is shown.', 'https://i5.walmartimages.com/asr/c7308c82-20bf-4fe5-9e8a-d2a2824f8578.0a0223787228388662d259785d0b5e5d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    
    -- Oils, Vinegars, & Spices(1400)
    (1401,'Extra Virgin Olive Oil', 4.89, 'Oils, Vinegars, Spices', '16 fluid oz', 'Pompeian', 'First cold pressed, full-bodied flavor, perfect for salad dressings & marinades', 'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71LkfO2Ju1L._SL1500_.jpg'  ),
    (1402,'Balsamic Vinegar', 3.84, 'Oils, Vinegars, Spices', '16 fluid oz', 'Pompeian', 'Pompeian Balsamic Vinegar is perfect for salad dressings, sauces, seafood and meat dishes', 'https://i5.walmartimages.com/asr/c00be965-bfaf-4a7d-be5d-55ee1677befe.d52ac002c25d2d9a68c362295bd91bb0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'  ),
    (1403,'Crushed Red Pepper', 5.84, 'Oils, Vinegars, Spices', '4.62 oz', 'McCormick', 'McCormick Crushed Red Pepper always starts with whole, ripe peppers. We blend the optimal levels of seeds and pods to deliver bold flavor and balanced heat', 'https://i5.walmartimages.com/asr/e74fd3d0-f2cc-490b-8712-09c85a2d528d_1.7e5a0a4ca9175c0468e97ffd4a336908.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'  ),
    
    -- Alcohol(1500)
    (1501,'Oberon Beer', 12.99, 'Alcohol', '6 x 12 fluid oz bottles', "Bell's", "Bell's Oberon is a wheat ale fermented with Bell's signature house ale yeast, mixing a spicy hop character with mildly fruity aromas", 'https://cdn.shoplightspeed.com/shops/635997/files/36702795/1200x1124x2/image.jpg'),
    (1502,'Natural Light', 9.99, 'Alcohol', '15 x 12 fluid oz cans', "Natural Light", "Natural Light is brewed with a blend of premium American and imported hops, and a combination of malt and corn. Its longer brewing process produces a lighter body, fewer calories and an easy-drinking character", 'https://cdn.shopify.com/s/files/1/0397/1501/2775/products/natural-light-15-pack-12-oz-cans_375x.jpg?v=1611284894'),
    (1503,'Four Loko Gold', 2.99, 'Alcohol', '23 fluid oz cans', "Four Loko", "Time to get Litty 🔥", 'https://cdn.shopify.com/s/files/1/0270/8439/0423/products/NewProject-2022-03-11T160400.933.jpg?v=1647036250'),
    
    -- Health Care(1600)
    (1601,'Tylenol', 6.99, 'Health Care', '24 x 500mg tablets', 'Tylenol', 'Extra strength acetaminophen for minor aches and pains', 'https://www.instacart.com/image-server/932x932/filters:fill(FFF,true):format(webp)/www.instacart.com/assets/domains/product-image/file/large_c2fd4670-cfd4-4319-9f62-f5d98321d405.png'),
    (1602,'Pepto Bismol', 4.34, 'Health Care', '8 fluid oz', 'Pepto', '5 SYMPTOM Digestive Relief: Nausea, Heartburn, Indigestion, Upset Stomach, Diarrhea', 'https://i5.walmartimages.com/asr/d3c37b77-9dd7-4ec0-9370-6405695ac83d.2b7978f7ab433be3f2dba58e7162bb79.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),
    (1603,'Old Spice Deoderant Bear Glove', 5.47, 'Health Care', '3 oz', 'Old Spice', 'The #1 aluminum-free odor fighter, Old Spice Bearglove is an improved deodorant with the long-lasting scent of crisp apples and success', 'https://i5.walmartimages.com/asr/379e330e-aeea-4aa1-9b70-a5bb4541f80b.0e65eebfa521ed26c8b33b6e31a65062.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF')

;


INSERT INTO `grocery-shopper`.`users` (
    `id`,
    `email`,
    `password`
)

-- VALUES for users

VALUES
    -- Fake Will
    ('420', 'Will@email.com', 'password1'),
    -- Fake Duncan
    ('69', 'Duncan@email.com', 'password2'),
    -- Fake Ford
    ('666', 'Ford@email.com', 'password3')
;

INSERT INTO `grocery-shopper`.`cart_items` (`customer_id`, `product_id`, `quantity`, `total`) 

-- VALUES ('customer_id', 'product_id', 'quantity', 'total')

VALUES
    ('420', '101', 2, 9.74),
    ('420', '902', 3, 36.00), 
    ('69', '201', 1, 2.50),
    ('69', '301', 2, 5.54),
    ('666', '402', 2, 9.92),
    ('666', '1502', 1, 9.99)
    ;
-- This SQL script is used to populate the database with initial data for a food delivery application.
use dbmain;
-- Insert users
INSERT INTO users (first_name, last_name, date_of_birth, mobile, email, password) VALUES
('Rahul', 'Sharma', '1990-05-20', '91234567', 'rahul.sharma@example.com', 'pass1234'),
('Priya', 'Menon', '1988-11-02', '92345678', 'priya.menon@example.com', 'pass1234'),
('Amit', 'Verma', '1995-07-15', '93456789', 'amit.verma@example.com', 'pass1234');
-- Insert user addresses
INSERT INTO user_address (user_id, unit_no, address_line_1, address_line_2, postal_code) VALUES
(1, '101A', 'Yishun Ring Road', 'Yishun', '560001'),
(2, '202B', 'Outram Park Road', 'Outram', '560078'),
(2, '901', 'Bukit Batok Road', 'Bukit Batok', '500092'),
(3, '303C', 'Woodlands Avenue 1', 'Woodlands', '400053'),
(3, '110', 'Marsiling Rise', 'Marsiling', '700073');
-- Insert menu groups
INSERT INTO menu_groups (group_name, group_description) VALUES
('Starters', 'Delicious appetizers to begin your meal'),
('Breads', 'Freshly baked traditional Indian breads'),
('Main Course', 'Flavorful curries and gravies'),
('Rice Dishes', 'Aromatic rice preparations'),
('Desserts', 'Sweet endings to your meal');
-- Insert menu items
INSERT INTO menu_items (group_id, item_name, item_description, item_price, item_image) VALUES
(1, 'Samosa', 'Crispy pastry with spiced potato filling', 120.00, 'samosa.jpg'),
(1, 'Paneer Tikka', 'Grilled cottage cheese with spices', 180.00, 'paneer_tikka.jpg'),
(1, 'Chicken 65', 'Spicy deep-fried chicken appetizer', 220.00, 'chicken_65.jpg'),
(2, 'Naan', 'Classic leavened tandoor bread', 50.00, 'naan.jpg'),
(2, 'Garlic Naan', 'Naan infused with garlic butter', 70.00, 'garlic_naan.jpg'),
(2, 'Roti', 'Whole wheat unleavened flatbread', 40.00, 'roti.jpg'),
(3, 'Butter Chicken', 'Creamy tomato-based chicken curry', 280.00, 'butter_chicken.jpg'),
(3, 'Palak Paneer', 'Spinach and cottage cheese curry', 220.00, 'palak_paneer.jpg'),
(3, 'Chicken Biryani', 'Fragrant rice with chicken and spices', 250.00, 'chicken_biryani.jpg'),
(3, 'Dal Makhani', 'Creamy black lentils slow-cooked', 180.00, 'dal_makhani.jpg'),
(4, 'Jeera Rice', 'Basmati rice with cumin seeds', 120.00, 'jeera_rice.jpg'),
(4, 'Vegetable Pulao', 'Fragrant rice with mixed vegetables', 150.00, 'veg_pulao.jpg'),
(5, 'Gulab Jamun', 'Soft milk balls in sugar syrup', 90.00, 'gulab_jamun.jpg'),
(5, 'Kheer', 'Traditional rice pudding', 80.00, 'kheer.jpg');
-- Insert orders (assuming user_id 1 exists)
INSERT INTO orders (user_id, order_date, gst_rate, gst_amount, delivery_fee, total_amount) VALUES
(1, '2023-10-15 18:30:00', 5, 52.50, 40.00, 1142.50),
(1, '2023-10-16 19:45:00', 5, 29.75, 40.00, 664.75),
(1, NOW(), 5, 34.00, 40.00, 754.00);
-- Insert order items
INSERT INTO order_items (order_id, item_id, quantity) VALUES
(1, 3, 2),  -- 2 Chicken 65
(1, 7, 1),  -- 1 Butter Chicken
(1, 4, 3),  -- 3 Naan
(1, 13, 2), -- 2 Gulab Jamun
(2, 2, 1),  -- 1 Paneer Tikka
(2, 8, 1),  -- 1 Palak Paneer
(2, 5, 2),  -- 2 Garlic Naan
(2, 14, 1), -- 1 Kheer
(3, 9, 1), -- 1 Chicken Biryani
(3, 6, 1),  -- 1 Roti
(3, 11, 1); -- 1 Jeera Rice
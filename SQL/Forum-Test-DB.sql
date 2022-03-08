INSERT INTO users (username, password, email, screenName, createdAt, updatedAt)
VALUES ("TestUser1", "12345678", "example@email.com", "BestTest", CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
INSERT INTO users (username, password, email, screenName, createdAt, updatedAt)
VALUES ("BilboBaggins", "Password1", "hobbiton@theshire.org", "B.Baggins", CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
INSERT INTO users (username, password, email, screenName, createdAt, updatedAt)
VALUES ("JohnDoe", "genericPassword!", "anotheremail@blahblah.net", "Enigma1", CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
INSERT INTO categories (name, createdAt, updatedAt)
VALUES ("Test Forum", current_timestamp(), current_timestamp());
INSERT INTO categories (name, createdAt, updatedAt)
VALUES ("Introductions", current_timestamp(), current_timestamp());
INSERT INTO categories (name, createdAt, updatedAt)
VALUES ("Technology", current_timestamp(), current_timestamp());
INSERT INTO threads (categoryId, authorId, subject, createdAt, updatedAt)
VALUES (1, 1, "Test", current_timestamp(), current_timestamp());
INSERT INTO threads (categoryId, authorId, subject, createdAt, updatedAt)
VALUES (1, 1, "TestTest", current_timestamp(), current_timestamp());
INSERT INTO threads (categoryId, authorId, subject, createdAt, updatedAt)
VALUES (2, 2, "Hello All", current_timestamp(), current_timestamp());
INSERT INTO threads (categoryId, authorId, subject, createdAt, updatedAt)
VALUES (3, 3, "Lorem Ipsum", current_timestamp(), current_timestamp());
INSERT INTO posts (threadId, authorId, threadStarter, body, createdAt, updatedAt)
VALUES (1, 1, true, "This is a Test thread, please ignore", current_timestamp(), current_timestamp());
INSERT INTO posts (threadId, authorId, threadStarter, body, createdAt, updatedAt)
VALUES (2, 1, true, "This is a TestTest thread, please ignore", current_timestamp(), current_timestamp());
INSERT INTO posts (threadId, authorId, threadStarter, body, createdAt, updatedAt)
VALUES (3, 2, true, "Hello world!", current_timestamp(), current_timestamp());
INSERT INTO posts (threadId, authorId, threadStarter, body, createdAt, updatedAt)
VALUES (4, 3, true, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", current_timestamp(), current_timestamp());
INSERT INTO posts (threadId, authorId, threadStarter, body, createdAt, updatedAt)
VALUES (3, 3, false, "Hello, It's nice to meet you!", current_timestamp(), current_timestamp());
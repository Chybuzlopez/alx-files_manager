test('Database client can connect to the database', () => {
  // Initialize and connect the database client
  const dbClient = new DBClient();

  // Assert that the connection is successful
  expect(dbClient.isAlive()).toBe(true);
});

test('Database client can insert and retrieve data', () => {
  const dbClient = new DBClient();
  const user = {
    id: 1,
    name: 'Chibuzo Nwakacha',
    email: 'danielorihanna@gmail.com',
  };

  // Insert the user into the database
  dbClient.insertUser(user);

  // Retrieve the user from the database
  const retrievedUser = dbClient.getUser(user.id);

  // Assert that the retrieved user matches the original user
  expect(retrievedUser).toEqual(user);
});


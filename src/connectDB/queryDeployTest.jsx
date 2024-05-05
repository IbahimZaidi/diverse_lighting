import mysql from "mysql2/promise";

// link to json data :
// https://jsonplaceholder.typicode.com/

export const queryDeployTest = async ({ query, values }) => {
  const dbConn = await mysql.createConnection({
    host: "sql11.freesqldatabase.com", //
    database: "sql11704007",
    user: "sql11704007",
    password: "cJi19iep1U",
    // port: 3306,
  });

  try {
    const [results] = await dbConn.execute(query, values);

    dbConn.end(); // end connection
    return results; // return the table of db.execute(query , values);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * The database access for user filters
 * Note: all functions should return promises - error handling should be left to caller
 */

const mysql = require('promise-mysql');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const getAgeFilter = (id) => {
  return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const query = mysql.format(`
    SELECT
      FS.AgeFilterState AS state,
      AF.MinAge AS minAge,
      AF.MaxAge AS maxAge
    FROM FilterState FS
      LEFT JOIN AgeFilter AF
        ON FS.UserID = AF.UserID
    WHERE 
      FS.UserID = ?;
    `,
      [id]
    );

      const result = conn.query(query).then((rows) => {
        if (rows && rows.length) {
          return {
            state: rows[0].state === 1,
            minAge: rows[0].minAge,
            maxAge: rows[0].maxAge
          };
        }
        return null;
      });

      conn.end();
      return result;
    });
};

const saveAgeFilter = (id, ageFilter) => {
  const insertStateQuery = mysql.format(
    `
  INSERT INTO FilterState (UserID, AgeFilterState)
  VALUES (?, ?)
  ON DUPLICATE KEY UPDATE AgeFilterState = ?;
  `,
    [id, ageFilter.state, ageFilter.state]
  );

  const insertFilterQuery = mysql.format(
    `
  INSERT INTO AgeFilter (UserID, MinAge, MaxAge)
  VALUES (?, ?, ?) 
  ON DUPLICATE KEY UPDATE MinAge = ?, MaxAge = ?;`,
  [id, ageFilter.minAge, ageFilter.maxAge, ageFilter.minAge, ageFilter.maxAge]);

  return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      return conn.beginTransaction()
        .then(() => conn.query(insertStateQuery))
        .then(() => conn.query(insertFilterQuery))
        .then(() => conn.commit())
        .then(() => conn.end())
        .catch((err) => {
          conn.rollback().then(() => conn.end());
          throw err;
        });
    });
};

const getGenderFilter = (id) => {
  return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const query = mysql.format(`
    SELECT
      FS.GenderFilterState AS state,
      GT.GenderID AS genderID,
      GT.GenderType AS genderName
    FROM FilterState FS
      INNER JOIN GenderFilter GF
        ON FS.UserID = GF.UserID
      INNER JOIN GenderType GT
        ON GF.GenderID = GT.GenderID
    WHERE
      FS.UserID = ?
    ORDER BY
      genderID;
    `,
      [id]
    );

      const result = conn.query(query).then((rows) => {
        if (rows && rows.length) {
          return {
            state: rows[0].state === 1,
            preference: rows.map(x => { return { genderID: x.genderID, genderName: x.genderName }; })
          };
        }
        return null;
      });
      conn.end();
      return result;
    });
};

const saveGenderFilter = (id, genderFilter) => {
  const insertStateQuery = mysql.format(
    `
  INSERT INTO FilterState (UserID, GenderFilterState)
  VALUES (?, ?)
  ON DUPLICATE KEY UPDATE GenderFilterState = ?;`,
  [id, genderFilter.state, genderFilter.state]);

  const deleteFilterQuery = mysql.format(
    `DELETE FROM GenderFilter WHERE UserID = ?;`,
    [id]
  );

  var insertFilterQuery = null;

  if (genderFilter.preference && genderFilter.preference.length) {
    insertFilterQuery = `INSERT INTO GenderFilter (UserID, GenderID) ` +
      genderFilter.preference.map(x => mysql.format(` SELECT ? AS UserID, ?  AS GenderID `, [id, x.genderID]))
        .join(` UNION ALL `) + `;`;
  }

  return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      return conn.beginTransaction()
        .then(() => conn.query(insertStateQuery))
        .then(() => conn.query(deleteFilterQuery))
        .then(() => insertFilterQuery ? conn.query(insertFilterQuery) : null)
        .then(() => conn.commit())
        .then(() => conn.end())
        .catch((err) => {
          conn.rollback().then(() => conn.end());
          throw err;
        });
    });
};

module.exports = {
  getAgeFilter,
  saveAgeFilter,
  getGenderFilter,
  saveGenderFilter
};

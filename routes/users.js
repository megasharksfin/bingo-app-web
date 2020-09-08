const express = require('express');
const router = express.Router();
const sql = require('../sql-connection');

router.get('/', async (req, res) => {
  sql.query(`SELECT * FROM users`, async (err, rows, fields) => {
    if (err) {
      throw(err);
    }

    const users = await rows.findAll();
    res.send(users);
  });
});

router.post('/', async (req, res) => {
  const { username, role } = req.body;
  const isBingo = 0;
  
  if (!username || username == ' ' || !role) {
    res.status(400).json({
      error: {
        message: 'One or more fields have invalid value/s. Please review and try again.'
      }
    });
    return;
  }

  sql.query(`INSERT INTO users (username, role, isBingo) VALUES (?, ?, ?)`, [ username, role, isBingo ], (err, rows) => {
    if (err) {
      throw(err);
    }

    const userId = rows.insertId;
    const user = {
      userId,
      username,
      role,
      isBingo
    };

    res.status(201).json(user);
  });
});

router.put('/:userId/isBingo', async (req, res) => {
  const { userId } = req.params;
  const { isBingo } = req.body;

  if (isBingo === null || !userId) {
    res.status(400).json({
      error: {
        message: 'Invalid value received.'
      }
    });
    return;
  }

  sql.query(`UPDATE users SET isBingo=? WHERE userId=?`, [ isBingo, userId ], (err) => {
    if (err) {
      throw(err);
    }

    res.status(200).json();
  });
});

router.delete('/', async (req, res, next) => {
  sql.query(`DELETE FROM users`, (err) => {
    if (err) {
      throw(err);
    }

    res.status(200).json;
  });
});

router.delete('/:userId', async (req, res) => {
  const id = +req.params.userId;

  sql.query(`DELETE FROM users WHERE userid=?`, [ id ], (err) => {
    if (err) {
      throw(err);
    }

    res.status(200).json;
  });
});

module.exports = router;
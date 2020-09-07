const express = require('express');
const router = express.Router();
const sql = require('../sql-connection');

router.get('/status', async (req, res) => {
  sql.query(`SELECT * FROM gamestatus`, (err, rows, fields) => {
    if (err) {
      throw(err);
    }

    res.status(201).json(rows[0]);
  });
});

router.get('/number', async (req, res) => {
  sql.query(`SELECT * FROM bingovalues`, (err, rows, fields) => {
    if (err) {
      throw(err);
    }

    res.status(201).json(rows);
  });
});

router.put('/status', async (req, res) => {
  const { status, endgame } = req.body;

  if (status === null) {
    res.status(400).json({
      error: {
        message: 'Invalid value received.',
      }
    });
    return;
  }

  sql.query(`UPDATE gamestatus SET status=?, endgame=?`, [ status, endgame ], (err) => {
    if (err) {
      throw(err);
    }

    res.status(200).json();
  });
});

router.post('/number', async (req, res) => {
  const { letter, number } = req.body;

  if (!letter || !number) {
    res.status(400).json({
      error: {
        message: 'Invalid value received.',
      }
    });
    return;
  }

  sql.query(`INSERT INTO bingovalues (letter, number) VALUES (?, ?)`, [ letter, number ], (err) => {
    if (err) {
      throw(err);
    }

    const bingoNum = {
      letter,
      number
    };

    res.status(201).json(bingoNum);
  });
});

router.delete('/number', async (req, res) => {
  sql.query(`DELETE FROM bingovalues`, (err) => {
    if (err) {
      throw(err);
    }

    res.status(200).json();
  });
});

module.exports = router;
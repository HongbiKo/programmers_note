const conn = require("../mariadb"); // db 모듈
const { StatusCodes } = require("http-status-codes"); // status code 모듈

const addLike = (req, res) => {
  const { id } = req.params; // book_id
  const { user_id } = req.body; // 지금은 토큰이 없으므로 Body값으로 확인해보자

  let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
  let values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const removeLike = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";
  let values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = { addLike, removeLike };

const conn = require("../mariadb"); // db 모듈
const { StatusCodes } = require("http-status-codes"); // status code 모듈
const jwt = require("jsonwebtoken"); // jwt 모듈
const crypto = require("crypto"); // crypto 모듈 : 암호화
const dotenv = require("dotenv"); // dotenv 모듈
dotenv.config();

const login = (req, res) => {
  const { email, password } = req.body;

  let sql = `SELECT * FROM users WHERE email = ?`;

  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const loginUser = results[0];

    // salt값 꺼내서 날 것으로 들어온 비밀번호를 암호화 해보고
    const hashPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 10000, 10, "sha512")
      .toString("base64");

    // => 디비 비밀번호랑 비교
    if (loginUser && loginUser.password == hashPassword) {
      // 토큰 발행
      const token = jwt.sign(
        {
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "5m",
          issuer: "hongbi",
        }
      );
      // 토큰 쿠키에 담기
      res.cookie("token", token, { httpOnly: true });
      console.log(token);

      res.status(StatusCodes.OK).json(results);
    } else {
      res.status(StatusCodes.UNAUTHORIZED).end();
      // 403 : Forbidden (접근 권리 없음)
      // 401 : Unauthorized (미인증 상태)
      // 403은 접근 권리가 없다는 뜻인데, 서버는 그 사람이 누구인지 알고 있지만
      // 401은 그 사람이 누군지 모름
    }
  });
};

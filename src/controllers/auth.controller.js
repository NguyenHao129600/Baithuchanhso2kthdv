const jwt = require("jsonwebtoken");
const db = require("../config/database");

const login = (req, res) => {

    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({
            message: "Vui lòng nhập userName và password"
        });
    }

    const sql = `
        SELECT *
        FROM Users
        WHERE UserName = ? AND Password = ?
    `;

    db.query(sql, [userName, password], (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Lỗi database",
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Sai username hoặc password"
            });
        }

        const user = results[0];

        const token = jwt.sign(
            {
                IdUser: user.IdUser,
                UserName: user.UserName
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        const updateSql = `
            UPDATE Users
            SET Token = ?
            WHERE IdUser = ?
        `;

        db.query(
            updateSql,
            [token, user.IdUser],
            (updateErr) => {

                if (updateErr) {
                    return res.status(500).json({
                        message: "Không thể lưu token",
                        error: updateErr.message
                    });
                }

                res.status(200).json({
                    message: "Đăng nhập thành công",
                    token: token
                });

            }
        );
    });
};

module.exports = {
    login
};
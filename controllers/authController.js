const jwt = require('jsonwebtoken');
const db = require('../config/db');
// const bcrypt = require('bcrypt');
const crypto = require('crypto');

class AuthController {
  async test(request, response) {
    console.log(`it's alive`);
    return response
    .status(200)
    .json({ 
        message:`it's alive`, 
    });
    
  }

  async login(request, response) {
    const { username, password } = request.body;
    console.log('login');
    console.log(username);
    console.log(password);

    try {
      const hashedPassword = crypto.createHash('md5').update(password, 'utf8').digest('hex');
      const [[user]] = await db.query('SELECT * FROM user2 WHERE username = ? AND password = ?', [username, hashedPassword]);

      if (user) { 
        const user_return = {
          username: user.username,
          userid: user.id,
        };
        // const token = jwt.sign({ id: user[0].int_funcionario_id_p }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const token = jwt.sign(user_return, process.env.JWT_SECRET, { expiresIn: '1h' });
  
        return response
            .status(200)
            .json({ 
                message: 'Login successful', 
                token, 
            });
      } else {
        return response
            .status(401)
            .json({ 
                message: 'Invalid credentials' 
            });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ 
            message: 'Something went wrong. Please contact the administrator', 
            error: error.message || error 
        });
    }
  }
}

module.exports = new AuthController();

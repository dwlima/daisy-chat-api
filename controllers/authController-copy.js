const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require('bcrypt');

class AuthController {
  // constructor() {
  //   // Bind the methods to ensure `this` is correctly set
  //   this.login = this.login.bind(this);
  //   this.validUser = this.validUser.bind(this);
  // }

  login2 = async (req, res) => {
    const { email, password } = req.body;
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (user && bcrypt.compareSync(password, user[0].password)) {
        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
  };

  async validUser(email, password) {
    console.log('validUser');
    const mockUser = {
        email: 'dwlima@gmail.com',
        password: '123' 
    };

    return email === mockUser.email && password === mockUser.password;
  }

  async login(request, response) {
    const { email, password } = request.body;
    console.log('login');
    console.log(email);
    console.log(password);

    const token = 'aaaaaaaa';
    const user = {
        id: 1,
        name: 'Dayvid Lima',
        email
    };

    try {  
        // Chama o método validUser
        if (await this.validUser(email, password)) {
            console.log('login::valido');
            return response
                .status(200)
                .json({ 
                    message: 'Login successful', 
                    token, 
                    user 
                });
        } 
        console.log('login::invalido');
        return response
            .status(401)
            .json({ 
                message: 'Invalid email or password' 
            });
        
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

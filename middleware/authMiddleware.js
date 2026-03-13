// authMiddleware.js
const jwt = require('jsonwebtoken'); // Se você estiver usando JSON Web Tokens

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    // Remova o "Bearer" do token se estiver presente
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }
        req.user = decoded; // Você pode armazenar os dados do usuário decodificados no objeto de requisição
        next();
    });
};

module.exports = authMiddleware;

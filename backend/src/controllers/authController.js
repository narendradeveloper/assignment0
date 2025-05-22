
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

module.exports = (AppDataSource) => {

    const UserRepo = AppDataSource.getRepository("User"); 

    const signup = async (req, res) => {
        try {

            const { username, password, role } = req.body;

            const existingUser = await UserRepo.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = UserRepo.create({
                username,
                password: hashedPassword,
                role: role || 'Employee',
            });

            await UserRepo.save(user);
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Registration failed' });
        }
    };

    const login = async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await UserRepo.findOne({ where: { username } });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            if (!process.env.JWT_SECRET) {
                console.error("JWT_SECRET is not defined in .env");
                return res.status(500).json({ message: 'Server configuration error' });
            }

            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.status(200).json({ message: 'Login successful', token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Login failed' });
        }
    };

    return { signup, login };
};


const login = async (req, res) => {
    res.json({ status: 'API is running' });
}   

const register = async (req, res) => {
    res.json({ status: 'API is running' });
}

const logout = async (req, res) => {
    res.json({ status: 'API is running' });
}       

const getMe = async (req, res) => {
    res.json({ status: 'API is running' });
}   

const refreshToken = async (req, res) => {
    res.json({ status: 'API is running' });
}   

module.exports = {
    login,
    register,   
    logout,
    getMe,
    refreshToken
}

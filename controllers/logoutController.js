const User = require('../model/User');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(204); //No content
    const refreshToken = cookies.refreshToken;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        // res.clearCookie('jwt', { httpOnly: true, sameSite: 'Lax', secure: false });
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Lax', secure: false });
        res.clearCookie('accessToken', { httpOnly: true, sameSite: 'Lax', secure: false });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    // console.log(result);

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Lax', secure: false });
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'Lax', secure: false });
    // res.redirect(302, '/regauth')
    res.sendStatus(204);
}

module.exports = { handleLogout }
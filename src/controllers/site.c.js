module.exports = {
    redirectPage: async (req, res, next) => {
        try {
            if (req.session.auth) {
                res.redirect('http://localhost:3000/admin');
            } else {
                res.redirect('http://localhost:3000/acc/login');
            }
        } catch (error) {
            next(error);
        };
    },
}
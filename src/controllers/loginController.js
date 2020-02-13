const debug = require('debug')('app:loginController');

loginController = () => {
	function displayHome(req, res) {
    res.render(
        'loginView',
        {
            title: 'login',
        });
    };

}

module.exports = loginController;
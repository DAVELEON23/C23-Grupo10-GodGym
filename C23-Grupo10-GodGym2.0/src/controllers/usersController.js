const usersController = {
    registro: (req, res) => {
        res.render('users/register', { title: 'GOD GYM'});
      },
      login: (req, res) => {
        res.render('users/login', { title: 'GOD GYM'});
      },
      
}


module.exports = usersController

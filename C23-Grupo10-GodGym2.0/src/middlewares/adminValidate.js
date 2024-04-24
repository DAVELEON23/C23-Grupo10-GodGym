const adminValidate = (req,res,next) =>{
    if(req.session.user && req.session.user.id_roles == 1){
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = adminValidate
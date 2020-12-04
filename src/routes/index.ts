import auth from "../components/auth/auth.routes";
import user from "../components/user/user.routes";


export = app => {
    app.use('/auth', auth);
    app.use('/user', user);   
}
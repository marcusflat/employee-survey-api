import auth from "../components/auth/auth.routes";
import user from "../components/user/user.routes";
import questions from "../components/questions/questions.routes";
import answers from "../components/answers/answers.routes";

export = app => {
    app.use('/auth', auth);
    app.use('/user', user);
    app.use('/questions', questions);
    app.use('/answers', answers);
}
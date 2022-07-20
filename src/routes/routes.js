import config from '../config';
// Layouts

// Pages
import Home from '../pages/Home';
import Result from '../pages/Result';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ChooseAccount from '../pages/ChooseAccount';
import Teacher from '../pages/ChooseAccount/teacher';
import Student from '../pages/ChooseAccount/student';
import ListRoom from '../pages/ChooseAccount/teacher/room/list';
import ViewRoom from '../pages/ChooseAccount/teacher/room/watch';
import Student_username from '../pages/ChooseAccount/student/student-Username';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.result, component: Result },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },

    {path:  config.routes.chooseAccount, component:ChooseAccount},
    {path:  config.routes.teacher, component:Teacher},
    {path:  config.routes.student, component:Student},
    {path:  config.routes.student_username, component:Student_username},
    {path:  config.routes.room, component:ListRoom},
    {path:  config.routes.watch, component:ViewRoom},
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };
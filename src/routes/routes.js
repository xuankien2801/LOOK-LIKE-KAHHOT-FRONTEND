import React from 'react';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';

// import config from '../configs';
// Layouts

// Pages
import Home from '../pages/Home/Home';
import Result from '../pages/Result/Result';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import EditGame from '../pages/Game/edit';
import PlayGame from '../pages/Game/play';
import JoinGame from '../pages/Game/join';
import EditQuestion from '../pages/Questions/edit';


/*
import ChooseAccount from '../pages/ChooseAccount';
import Teacher from '../pages/ChooseAccount/teacher';
import Student from '../pages/ChooseAccount/student';
import ListRoom from '../pages/ChooseAccount/teacher/room/list';
import ViewRoom from '../pages/ChooseAccount/teacher/room/watch';
import Student_username from '../pages/ChooseAccount/student/student-Username';
*/

export const Router = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/edit/game/:quizId" element={<EditGame />} />
                <Route path="/edit/game/:quizId/question/:questionId" element={<EditQuestion />}/>
                <Route path="/edit/game/:sessionId/results" element={<Result />}></Route>
                <Route exact path="/play/game/" element={<JoinGame />} />
                <Route path="/play/game/:sessionId" element={<JoinGame />} />
                <Route path="/playing/player/:playerId" element={<PlayGame />} />
            </Routes>
        </BrowserRouter>
    );
  }


    /*
    {path:  config.routes.chooseAccount, component:ChooseAccount},
    {path:  config.routes.teacher, component:Teacher},
    {path:  config.routes.student, component:Student},
    {path:  config.routes.student_username, component:Student_username},
    {path:  config.routes.room, component:ListRoom},
    {path:  config.routes.watch, component:ViewRoom},
    */
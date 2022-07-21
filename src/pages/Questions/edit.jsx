import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/Button/BackButton';
import AdminNavBar from '../../components/Bars/AdminNavBar';
import QuestionForm from '../../components/Question/QuestionForm';

export const questionStyle = {
  width: '100%',
  margin: '15px auto',
}

// This page allows an admin to edit a question as required by 2.2.3
const EditQuestion = () => {
  const token = localStorage.getItem('token');
  const { quizId } = useParams();
  const { questionId } = useParams();

  return (
    <>
    <header>
      <nav>
        <AdminNavBar></AdminNavBar>
      </nav>
      <BackButton address={`/edit/game/${quizId}`}></BackButton>
    </header>
    <main>
      <QuestionForm token={token} quizId={quizId} questionId={questionId}></QuestionForm>
    </main>
    </>
  )
}

export default EditQuestion;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGameInfo } from './GameFeed';
import { GroupDiv } from '../pages/dashboard';
import Button from '@mui/material/Button';
import FullButton from './FullButton';
import Title from './Title';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';

const questionStyles = {
  backgroundColor: '#fafafa',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between',
}

// This component is used by the editGame page
// to display the questions that a particular game has
const QuestionFeed = ({ quizId, token }) => {
  const navigate = useNavigate();
  const [quizName, setQuizName] = React.useState('');
  const [quizThumb, setQuizThumb] = React.useState('');
  const [questions, setQuestions] = React.useState([]);
  const [refreshData, setRefreshData] = React.useState(false);
  const [dataUpdated, setDataUpdated] = React.useState(false);
  const [firstUpdate, setfirstUpdate] = React.useState(true);

  // This useEffect reacquires question details from the
  // backend everytime the question data is updated by
  // the user
  React.useEffect(async () => {
    await getQuestion(quizId, token);
  }, [dataUpdated]);

  // This useEffect forces an update with the backend data
  // everytime a question is added or removed
  React.useEffect(async () => {
    if (firstUpdate !== true) {
      await updateData();
    }
    setfirstUpdate(false);
  }, [refreshData]);

  // This function gets the question from the backend
  // and updates the appropriate states
  const getQuestion = async (quizId, token) => {
    setQuestions([]);
    const gameInfo = await fetchGameInfo(quizId, token);
    setQuizName(gameInfo.name);
    setQuizThumb(gameInfo.thumbnail);
    setQuestions(gameInfo.questions);
  }

  // This function adds a new question to the game
  const addQuestion = () => {
    getQuestion(quizId, token);
    const newQuestions = [...questions];
    const length = newQuestions.length;
    let id = 0;
    console.log(length);
    if (length !== 0) {
      id = parseInt(newQuestions[length - 1].Id) + 1;
    }

    const Data = { Id: `${id}`, question: '', timeNeeded: 0, pointReq: 0, options: [{ answer: '' }, { answer: '' }], isMulti: true, URL: '', image: '', Correct: [] };
    newQuestions[length] = Data;
    setQuestions(newQuestions);
    setRefreshData(!refreshData);
  }

  // This function removes a question from the game
  const removeQuestion = (questionId) => {
    getQuestion(quizId, token);
    const newQuestions = [...questions];
    const filtered = newQuestions.filter(function (el) { return el.Id !== questionId; });
    setQuestions(filtered);
    setRefreshData(!refreshData);
  }

  // This function updates the question changes to the backend
  const updateData = async () => {
    await fetch(`http://localhost:5005/admin/quiz/${quizId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        questions: questions,
        name: quizName,
        thumbnail: quizThumb,
      })
    })
    setDataUpdated(!dataUpdated);
  }

  // This function navigates to the question edit pages
  const navigateEdit = (quizId, questionId) => {
    navigate(`/edit/game/${quizId}/question/${questionId}`);
  }
  return (
    <GroupDiv>
      <Title name="Questions"></Title>
      {questions.map((question, index) => {
        return (
          <div key={question.Id} style={questionStyles}>
            <h3>Question {index + 1}</h3>
            <div>
              <IconButton aria-label='Edit question button' onClick={() => navigateEdit(quizId, question.Id)}>
                <EditIcon ></EditIcon>
              </IconButton>
              <Button variant="contained" aria-label='Remove question button' onClick={() => removeQuestion(question.Id)}>Remove</Button>
            </div>
          </div>
        )
      })}
      <FullButton text="Add A Question" aria='Add question button' onClick={() => addQuestion()}></FullButton>
    </GroupDiv>
  )
}

QuestionFeed.propTypes = {
  quizId: PropTypes.string,
  token: PropTypes.string,
}

export default QuestionFeed;

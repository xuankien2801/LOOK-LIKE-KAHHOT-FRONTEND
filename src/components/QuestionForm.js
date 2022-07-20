import React from 'react';
import { TextField, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import { FormDiv } from '../pages/dashboard';
import { fetchGameInfo } from './GameFeed';
import FullButton from './FullButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { fileToDataUrl } from './ImageConverter';
import ErrorPopup from './ErrorPopup';
import PropTypes from 'prop-types';

export const questionStyle = {
  width: '100%',
  margin: '15px auto',
}

const fileStyle = {
  marginTop: '2px',
  marginBottom: '10px',
}

const TitleStyle = {
  paddingTop: '10px',
  marginBottom: '15px',
}

const OptionsDiv = {
  marginTop: '15px',
}

const OptionsStyle = {
  width: '90%',
  marginBottom: '15px',
}

const checkBoxStyle = {
  marginRight: '0',
}

const OptionsStyle1 = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
}

const correctStyle = {
  position: 'relative',
  top: '7px',
  width: '150px',
  textAlign: 'right',
}

const AddRemStyle = {
  margin: '0px 0 25px 0',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 5px',
}

const subTitleStyle = {
  margin: '0 0 20px 0',
}

const labelStyle = {
  marginTop: '10px',
  marginBottom: '0',
};

// This component is the question form that allows a user to edit the
// details of a question. It is used by the editQuestion page
const QuestionForm = ({ token, quizId, questionId }) => {
  const [question, setQuestion] = React.useState('');
  const [timeReq, setTimeReq] = React.useState(0);
  const [image, setImage] = React.useState('');
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [isMulti, setIsMulti] = React.useState(true);
  const [details, setDetails] = React.useState({});
  const [pointReq, setPointReq] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const [link, setLink] = React.useState('');
  const [quizName, setQuizName] = React.useState();
  const [quizThumb, setQuizThumb] = React.useState();
  const [checked, setChecked] = React.useState([false, false, false, false, false, false]);
  const [correctList, setCorrectList] = React.useState([]);

  const [popup, setPopup] = React.useState(false);
  const [descTitle, setDescTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');

  // This function activates the error popup
  const activatePopup = () => {
    setPopup(!popup);
  }

  // This useEffect initialises the state with the initial
  // question information given by the backend
  React.useEffect(async () => {
    const data = await fetchGameInfo(quizId, token);
    setQuizName(data.name);
    setQuizThumb(data.thumbnail);
    const questionList = data.questions;
    setDetails(questionList);
    const qIndex = questionList.findIndex(obj => obj.Id === questionId);
    setQuestionIndex(qIndex);
    setQuestion(questionList[qIndex].question);
    setTimeReq(questionList[qIndex].timeNeeded);
    setPointReq(questionList[qIndex].pointReq);
    setOptions(questionList[qIndex].options);
    setIsMulti(questionList[qIndex].isMulti);
    setLink(questionList[qIndex].URL);
    setupChecked(questionList[qIndex]);
    setCorrectList(questionList[qIndex].Correct);
  }, []);

  // This function sets up which answers are marked
  // as correct and should be checked
  const setupChecked = (question) => {
    const checkedList = [...checked];
    question.options.forEach((option, index) => {
      if (question.Correct.includes(index)) {
        checkedList[index] = true;
      } else {
        checkedList[index] = false;
      }
    })
    setChecked(checkedList);
  }

  // This function updates the state variables with
  // the user's new data and forces a rerender.
  // It also calls updateData to update the data
  // with the backend
  const updateDetails = async () => {
    const newDetails = [...details];
    newDetails[questionIndex].question = question;
    newDetails[questionIndex].timeNeeded = timeReq;
    newDetails[questionIndex].pointReq = pointReq;
    newDetails[questionIndex].options = options;
    newDetails[questionIndex].isMulti = isMulti;
    newDetails[questionIndex].URL = link;
    if (image === '') {
      newDetails[questionIndex].image = '';
    } else {
      const imageProcessed = await fileToDataUrl(image);
      newDetails[questionIndex].image = imageProcessed;
    }
    newDetails[questionIndex].Correct = correctList;
    setDetails(newDetails);
    updateData();
  }

  // This function allows the user to add an extra
  // answer option
  const addOption = () => {
    const optionList = [...options];
    const checkedList = [...checked]
    if (optionList.length < 6) {
      const newOption = { answer: '' };
      optionList.push(newOption);
      console.log(checkedList);
      setOptions(optionList);
    }
  }

  // This function allows the user to remove an
  // answer option
  const removeOption = () => {
    const optionList = [...options];
    const checkedList = [...checked];
    if (optionList.length > 2) {
      optionList.pop();
      removeCorrect(optionList.length);
      checkedList[optionList.length] = false;
      setOptions(optionList);
      setChecked(checkedList);
    }
  }

  // This function updates the options state variable
  // to include the answer that the user has entered
  const setOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index].answer = value;
    setOptions(newOptions);
  }

  // This function is triggered when an
  // answer option is selected to be correct/incorrect
  // It updates the checked state which governs
  // wether or not an option checkbox appears as checked
  const toggle = (index) => {
    const checkedList = [...checked];
    checkedList[index] = !checkedList[index];
    if (!isMulti) {
      removeRest(index);
      return;
    }
    if (checkedList[index]) {
      addCorrect(index);
    } else {
      removeCorrect(index);
    }
    setChecked(checkedList);
  }

  // This function adds a selected option to the correctList
  // state of correct answers
  const addCorrect = (index) => {
    const newCorrectList = [...correctList];
    if (!newCorrectList.includes(index)) {
      newCorrectList.push(index);
      setCorrectList(newCorrectList);
    }
  }

  // This function removes a selected option from the correctList
  // state of correct answers
  const removeCorrect = (index) => {
    const newCorrectList = [...correctList];
    if (newCorrectList.includes(index)) {
      const remIndex = newCorrectList.indexOf(index);
      newCorrectList.splice(remIndex, 1);
    }
    setCorrectList(newCorrectList);
  }

  // This function removes all answers but the selected one
  // from the correctList state. This works for singular answers
  const removeCorrectAll = (index) => {
    const newCorrectList = [];
    newCorrectList.push(index);
    setCorrectList(newCorrectList);
  }

  // This function unticks all answers which are not the
  // selected one. This works for singular answers
  const removeRest = (index) => {
    const original = checked[index];
    const newChecked = [false, false, false, false, false, false];
    newChecked[index] = !original;
    removeCorrectAll(index);
    setChecked(newChecked);
  }

  // This function updates all of the modified data for
  // the question to the backend
  const updateData = async () => {
    const req = await fetch(`http://localhost:5005/admin/quiz/${quizId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        questions: details,
        name: quizName,
        thumbnail: quizThumb,
      })
    })
    if (req.ok) {
      setDescTitle('Success!');
      setDesc('All changes submitted.');
      activatePopup();
    }
  }

  return (
    <>
      { popup && <ErrorPopup desc={desc} title={descTitle} toggle={() => activatePopup()}></ErrorPopup>}
      <form aria-label='Edit question form'>
        <FormDiv>
          <h2 style={TitleStyle}>Edit Question Details</h2>
          <TextField
            style={questionStyle}
            onChange={e => setQuestion(e.target.value)}
            label="Question" variant="outlined"
            value={question}
            required
            type='text'
            aria-label='Question'
            aria-required='true'
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={isMulti} />} onChange={() => setIsMulti(!isMulti)} label="Is Mutiple Choice" />
          </FormGroup>
          <TextField
            style={questionStyle}
            onChange={e => setTimeReq(e.target.value)}
            label="Time Required" variant="outlined"
            value={timeReq.toString()}
            type='number'
            required
            aria-label='Time required field'
            aria-required='true'
          />
          <TextField
            style={questionStyle}
            onChange={e => setPointReq(e.target.value)}
            label="Points Alotted" variant="outlined"
            value={pointReq.toString()}
            type='number'
            required
            aria-label='Points alotted field'
            aria-required='true'
          />
          <TextField
            style={questionStyle}
            onChange={e => setLink(e.target.value)}
            label="Video" variant="outlined"
            value={link}
            aria-label='Video upload field'
            aria-required='false'
          />
          <div>
            <label htmlFor='image' style={labelStyle}>Upload Image:</label>
            <input
              id='image'
              type="file"
              style={fileStyle}
              accept='image/*'
              onChange={e => setImage(e.target.files[0])}
              aria-label='Image upload field'
              aria-required='false'
            />
          </div>
          <div style={OptionsDiv}>
            <h3 style={subTitleStyle}>Answer Options</h3>
            {options.map((answer, index) => {
              return (
                <div key={index} style={OptionsStyle1}>
                  <TextField
                    style={OptionsStyle}
                    onChange={e => setOption(index, e.target.value)}
                    label={`Option ${index + 1}`} variant="outlined"
                    value={answer.answer}
                    aria-label='Option field'
                    required
                    aria-required='true'
                  />
                  <div style={correctStyle}>
                    <label htmlFor={`Correct${index}`}>Correct:</label>
                    <Checkbox id={`Correct${index}`} color="success" style={checkBoxStyle} checked={checked[index]} label="Correct" onChange={() => toggle(index)} aria-label='Mark question as correct checkbox'/>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={AddRemStyle}>
            <Button onClick={addOption} variant="outlined" startIcon={<AddCircleOutlineIcon />} color="success" aria-label='Add option button'>Add</Button>
            <Button onClick={removeOption} variant="outlined" startIcon={<RemoveCircleOutlineIcon />} color="error" aria-label='Remove option button'>Remove</Button>
          </div>
          <div style={OptionsDiv}>
            <FullButton text="Save Changes" onClick={() => updateDetails()} aria='Save changes button'/>
          </div>
        </FormDiv>
      </form>
    </>
  )
}

QuestionForm.propTypes = {
  token: PropTypes.string,
  quizId: PropTypes.string,
  questionId: PropTypes.string,
}

export default QuestionForm;

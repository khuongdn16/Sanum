import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import { store } from '../store';

const Profile = () => {
  const globalState = useContext(store);
  const { firstname, lastname, email, totalIntake, caloriesBurnt, goal } = globalState.state;
  const { dispatch } = globalState;
  // user useState to take value of goal input field 
  //useState hook here 
  const [userGoal, setUserGoal] = useState('');
  console.log('User input for goal >>> ', userGoal);

  const message = () => {
    let statusMessage = '';
    const stats = caloriesBurnt + goal - totalIntake;
    if (stats > 0){
      statusMessage = 'You achieved your weekly goal!';
      // alert('Celebrate! You achieved your weekly goal!');
    } else if (stats < 0){
      statusMessage = `You have ${Math.abs(stats)} calories to go!`;
    } else {
      statusMessage = `You have exceeded your goals by ${Math.abs(stats)} calories!!!`
    }
    return statusMessage;
  };



  const updateGoal = () => {
    // dispatch Action
    const payload = {
      goal: Number.parseInt(userGoal),   // << need the value from the input field 
    };

    dispatch({
      type: 'SET_CALORIC_GOAL',
      payload,
    });

    const option = {
      email,
      goal: Number.parseInt(userGoal),
    };

    fetch('/user',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(option),
    })
      .then(result => result.json())
      .then(result => console.log('Updated user >>> ', result.user[0].caloricgoal))
      .catch(err => console.log('error in post fetch on DB credential'));

    // clear input field
    const inputField = document.getElementById('goal');
    inputField.value = '';
    // reset the useState
    setUserGoal('');
  };

  return (
    <div className='profile-container'>
      <Navbar/>

      <div className='profile-box'>
        <div id='profile'>
          <h3>First Name: <span style={{ color: 'green' }}>{firstname}</span></h3>
          <h3>Last Name: <span style={{ color: 'green' }}>{lastname}</span></h3>
          <h3>Email: <span style={{ color: 'green' }}>{email}</span></h3>
          <br></br> <br></br>

          <div id= 'status-message' >
            <h2>{message()}</h2>
          </div>

          <div id= 'page-center'>
            <div>
              <p>Set your weekly goal:</p>
              <input
                type="text"
                className="form-control"
                id="goal"
                placeholder="Your weekly calorie goal"
                onChange= { (event) => setUserGoal(event.target.value) }
              />
              <button id='add-goal' className='btn btn-secondary' onClick = {updateGoal}>Confirm</button>
            </div>
          </div>

          <div>
            <h3>Current Goal: <span style={{ color: 'green' }}>{goal}</span></h3>
            <h3>Burnt Calories: <span style={{ color: 'green' }}>{caloriesBurnt}</span></h3>
            <h3> Calorie Intake: <span style={{ color: 'green' }}>{totalIntake}</span></h3>
          </div>

          <div id= 'encourage'>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <h1><span style={{ color: 'green' }}>Keep Up The Good Work!</span></h1>
          </div>
        </div>
      {/* </div> */}

        <div className='pics-container'>
          <div className='pics-row'>
            <div className='pics-column'>
              <img id='swim' src='src/swimmer.jpg' alt='swimming'/>
              <img id='biking' src='src/cycling.jpg' alt='biking'/>
              <img id='lift' src='src/lifting.jpg' alt='lifting'/>
            </div>
            <div class='pics-column'>
              <img id='two_dancers' src='src/two_dancers.jpg' alt='two_dancers'/>
              <img id='run' src='src/run.jpg' alt='running'/>
              <img id='climber' src='src/climber.jpg' alt='climber'/>
            </div>
            <div class='pics-column'>
              <img id='yoga' src='src/yoga.jpeg' alt='yoga'/>
              <img id='dancer' src='src/dancer.jpeg' alt='dancer'/>
              <img id='swim' src='src/swimmer.jpg' alt='swimming'/>
            </div>
          </div>
        </div>
          
      </div>
    </div>
  )
};

export default Profile;

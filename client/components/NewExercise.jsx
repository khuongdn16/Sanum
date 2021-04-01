import React, {Component, useState } from 'react';

const NewExercise = (props) => {

  const [calories, setCalories] = useState('');
  const [caption, setCaption] = useState('');
  const [picUrl, setPicUrl] = useState('');
  
  function submitExercise(e) {
    const input = document.getElementById('img');

    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; 
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const todayDate = year + "/" + month + "/" + day;

    const data = {
      caption,
      calories,
      picUrl,
      postType: 'exercise',
      userID: props.userId,
      timeStamp: todayDate,
    };
    fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  return (
    <div className='modal'>
      <h2>Enter new Exercise!</h2>
      <br></br>
      <br></br><br></br>
      <label>
        Calories Burned:
        <input type="text" onChange = {(event) => setCalories(event.target.value)}/>
      </label>
      <br></br><br></br>
      <label>
        Caption:
        <input type="text" onChange = {(event) => setCaption(event.target.value)}/>
      </label>
      <br></br><br></br>
      <label>
        picture Url:
        <input type="text" onChange={(event) => setPicUrl(event.target.value)} />
      </label>
      <br></br><br></br>
      <button type="button" onClick= {submitExercise}>Submit</button> 
    </div>
  );
}

export default NewExercise;
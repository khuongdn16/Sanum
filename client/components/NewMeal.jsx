import React, { Component, useState } from 'react';

const NewMeal = (props) => {
  const [calories, setCalories] = useState('');
  const [caption, setCaption] = useState('');
  const [picUrl, setPicUrl] = useState('');
  function submitMeal(e) {
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
      postType: 'meal',
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
      <h2>Enter new meal!</h2>
      <br></br>
      <br></br><br></br>
      <label>
        Calories:
        <input type="text" onChange={(event) => setCalories(event.target.value)} />
      </label>
      <br></br><br></br>
  
      <br></br><br></br>
      <label>
        Caption:
        <input type="text" onChange={(event) => setCaption(event.target.value)} />
      </label>
      <br></br><br></br>
      <label>
        picture Url:
        <input type="text" onChange={(event) => setPicUrl(event.target.value)} />
      </label>
      <br></br><br></br>

      <button type="button" onClick={submitMeal} >Submit</button> 
    </div>
  );
};

// const input = document.getElementById('img');

// // This will upload the file after having read it
// const upload = (file) => {
//   fetch('http://www.example.net', { // Your POST endpoint
//     method: 'POST',
//     headers: {
//       // Content-Type may need to be completely **omitted**
//       // or you may need something
//       "Content-Type": "You will perhaps need to define a content-type here"
//     },
//     body: file // This is your file object
//   }).then(
//     response => response.json() // if the response is a JSON object
//   ).then(
//     success => console.log(success) // Handle the success response object
//   ).catch(
//     error => console.log(error) // Handle the error response object
//   );
// };

// // Event handler executed when a file is selected
// const onSelectFile = () => upload(input.files[0]);

export default NewMeal;

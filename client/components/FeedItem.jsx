/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Popup from 'reactjs-popup';

const FeedItem = ({ firstname, caption, calories, picUrl }) => 

   (
    <div className='feedItem'>
      <img src={picUrl} alt="cloud" id ="cloud"/>
      <h3>
      {firstname} says:
      </h3>
      <h4>
        {caption}
      </h4>
      <h4>
        Calories: {calories}
      </h4>
      <i className="far fa-heart" />
      <Popup trigger={<i className="far fa-comment-dots" />} position="right center" modal>
        <div className='modal'>
        <label>
          Add a comment!
          <input type="text" />
        </label>
        <br></br><br></br>
        <button type="button" >Submit</button> 
        </div>
      </Popup>
    </div>
      
      
    
  )
  // return <div></div>;
;


export default FeedItem;
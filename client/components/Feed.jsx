/* eslint-disable prettier/prettier */
import React, { Component, useContext, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import FeedItem from './FeedItem';
import NewExercise from './NewExercise';
import NewMeal from './NewMeal';
// import 'reactjs-popup/dist/index.css';
import Navbar from './Navbar';
import { store } from '../store';

// request all posts and update the total caloric intake / expense from the post
// for the current user

const Feed = (props) => {
  const { dispatch, state } = useContext(store);
  const { firstname, lastname, userId } = state;
  const [display, setDisplay] = useState([]);

  const fetchFeed = () => {
    // fetch all posts data
    let totalIntake = 0;
    let caloriesBurnt = 0;
    fetch('/posts')
      .then(resp => resp.json())
      .then(data => {
        const posts = [];
        console.log(data);
        data.posts.forEach((post, idx) => {
          if (post.posttype === 'meal') totalIntake += post.calories;
          else caloriesBurnt += post.calories;

          // display FeedItem
          posts.push(<FeedItem
            key = {idx}
            firstname = {post.firstname}
            caption = {post.caption}
            calories = {post.calories}
            picUrl = {post.picurl}
          />);
        });
        // console.log('posts >>> ', posts);
        setDisplay(posts);
        // dispatch calorie calculation
        dispatch({
          type: 'CALCULATE_CALORIES',
          payload: {
            totalIntake,
            caloriesBurnt
          }
        });
      })
      .catch(err => console.log('Error fetching posts in Feed >>', err));
  };

  useEffect(() => {
    fetchFeed();
    // setInterval(fetchFeed, 3000);
  },[]);
  
  return (
    <div className='feed-container'>
      <Navbar />

      <div className='inputs-container'>
        <div className='inputs'>
          <Popup trigger={<button> New Meal</button>} position="right center" modal>
            <div>
              <NewMeal userId={userId} />
            </div>
          </Popup>
          <Popup trigger={<button> New Exercise</button>} position="right center" modal>
            <div>
              <NewExercise userId={userId} />
            </div>
          </Popup>
        </div>

        <div className="feed">
          {display}
        </div>
      </div>
    </div>
  );
};

export default Feed;

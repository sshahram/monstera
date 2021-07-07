import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import FriendList from '../components/Friends-list';
import UserProfile from '../components/User-profile';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = props => {
  const {username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const [isFriend, setFriend] = useState(false);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  // useEffect(()=> {
  //   // get signed in user:: loggedInUser = me;
  //   let loggedInUser = data?.user;
  //   if (loggedInUser.friends.include(user)) {
  //     setFriend(true);
  //   }
  //   // check loggedInUser.includes(user)
  //   // setFriend(true)
  // }, [])

  // redirect to personal profile page if username is yours
  //   if (
  //     Auth.loggedIn() &&
  //     Auth.getProfile().data.username === userParam
  //   ) {
  //     return <Redirect to="/profile" />;
  //   }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
      // setFriend(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveClick = async () => {
    try {
      await removeFriend({
        variables: { id: user._id }
      });
      // setFriend(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        <UserProfile />

        {userParam && (
          <div>
            <button className="btn ml-auto" onClick={handleClick}>
              Add Friend
            </button>
            <button className="btn ml-auto" onClick={handleRemoveClick}>
              Remove Friend
            </button>
          </div>
        )

        }

        {/* {userParam && (!isFriend ? (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        ):
        (<button className="btn ml-auto" onClick={handleRemoveClick}>
            Remove Friend
          </button>))} */}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <PostList posts={user.posts} title={`${user.username}'s posts...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <PostForm />}</div>
    </div>
  );
};

export default Profile;
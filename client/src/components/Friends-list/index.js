import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';


const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return (
      <p className="bg-dark text-light p-3">{username}, make some friends!</p>
    );
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ padding: 13 }}
      className="card mb-3"
    >
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? "friend" : "friends"}
      </h5>
      {friends.map(friend => (
        <ColorButton
          variant="contained"
          color="primary"
          style={{ margin: 10 }}
          className="col-12 col-md-3"
          key={friend._id}
          type="submit"
        >
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/profile/${friend.username}`}
          >
            {friend.username}
          </Link>
        </ColorButton>
      ))}
    </Grid>
  );
};

export default FriendList;

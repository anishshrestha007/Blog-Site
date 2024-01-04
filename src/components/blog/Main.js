import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { PostContext } from "../../helpers/PostContext";

function Main(props) {
  const { title } = props;

  const posts = React.useContext(PostContext);

  function getPosts() {
    // return (
    //   posts &&
    //   posts.length > 0 &&
    //   posts.map((post, index) => {
    //     return <div key={index} dangerouslySetInnerHTML={post.Content} />;
    //   })
    // );

    return (
      posts &&
      posts.length > 0 && (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            {posts[0].Title}
          </Typography>
          <Divider />
          <div
            key={posts[0].Title}
            dangerouslySetInnerHTML={posts[0].Content}
          />
        </React.Fragment>
      )
    );
  }

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      {getPosts()}
    </Grid>
  );
}

Main.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Main;

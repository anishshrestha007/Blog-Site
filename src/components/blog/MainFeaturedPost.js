import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { PostContext } from "../../helpers/PostContext";
import { useNavigate } from "react-router-dom";

function MainFeaturedPost(props) {
  const posts = React.useContext(PostContext);
  const navigate = useNavigate();

  function handleLinkTextClick(id) {
    navigate(`/blogdetail/${id}`);
  }

  let post = {
    title: "Title of a longer featured blog post",
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageText: "main image description",
    linkText: "Continue reading…",
  };

  if (posts && posts.length) {
    const randomID = Math.floor(Math.random() * posts.length);

    post = {
      ...post,
      description: posts[randomID].ContentSnippet,
      title: posts[randomID].Title,
      id: posts[randomID].Id,
    };
  }

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: "none" }}
          src={post.image}
          alt={post.imageText}
        />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Typography
              onClick={() => handleLinkTextClick(post.id)}
              variant="subtitle1"
              href="#"
            >
              {post.linkText}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  // post: PropTypes.shape({
  //   description: PropTypes.string.isRequired,
  //   image: PropTypes.string.isRequired,
  //   imageText: PropTypes.string.isRequired,
  //   linkText: PropTypes.string.isRequired,
  //   title: PropTypes.string.isRequired,
  // }).isRequired,
};

export default MainFeaturedPost;

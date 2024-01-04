import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { PostContext } from "../../helpers/PostContext";
import { useNavigate } from "react-router-dom";

function FeaturedPost(props) {
  const posts = React.useContext(PostContext);

  const navigate = useNavigate();

  function handleContinueReading(id) {
    navigate(`/blogdetail/${id}`);
  }

  function getFeaturedPosts() {
    let featuredPosts = posts.slice(0, 2);

    featuredPosts =
      featuredPosts &&
      featuredPosts.length > 0 &&
      featuredPosts.map((post, index) => {
        return {
          date: new Date().toDateString(),
          description: post.ContentSnippet,
          image: "https://source.unsplash.com/random?wallpapers",
          imageLabel: "Image Text",
          title: post.Title,
          id: post.Id,
        };
      });

    return (
      featuredPosts &&
      featuredPosts.length &&
      featuredPosts.map((post, index) => {
        return (
          <Grid key={index} item xs={12} md={6}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {post.date}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {post.description}
                  </Typography>
                  <Typography
                    onClick={() => handleContinueReading(post.id)}
                    variant="subtitle1"
                    color="primary"
                  >
                    Continue reading...
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                  image={post.image}
                  alt={post.imageLabel}
                />
              </Card>
            </CardActionArea>
          </Grid>
        );
      })
    );
  }

  return <React.Fragment>{getFeaturedPosts()}</React.Fragment>;
}

FeaturedPost.propTypes = {
  // post: PropTypes.shape({
  //   date: PropTypes.string.isRequired,
  //   description: PropTypes.string.isRequired,
  //   image: PropTypes.string.isRequired,
  //   imageLabel: PropTypes.string.isRequired,
  //   title: PropTypes.string.isRequired,
  // }).isRequired,
};

export default FeaturedPost;

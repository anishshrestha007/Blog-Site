import { Button, TextField } from "@mui/material";
import * as React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../css/CreateBlog.css";
import { createPost } from "./BlogAPIHandler";
import { ConvertToBase } from "../../helpers/baseHelpers";

export default function CreateBlog() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("<p>Hello World!</p>");
  async function handleCreateBlog(e) {
    e.preventDefault();
    try {
      console.log(title, content);
      const response = await createPost({
        title: title,
        content: ConvertToBase(content),
        createdOn: new Date(),
      });

      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="createblog-div">
      <form
        id="create-blog"
        className="create-blog"
        autoComplete="false"
        onSubmit={(e) => handleCreateBlog(e)}
      >
        <h2 className="createblog-h2">{title ? title : "Create Blog"}</h2>
        <TextField
          required
          variant="outlined"
          className="blog-title"
          color="secondary"
          type="text"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          label="Title"
        ></TextField>
        <div className="ckEditor">
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>

        <Button type="submit" variant="outlined" color="primary">
          Post
        </Button>
      </form>
    </div>
  );
}

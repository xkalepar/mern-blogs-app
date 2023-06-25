import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const response = await fetch('http://localhost:3001/api/v1/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="form" onSubmit={createNewPost}>
      <div className="subtitle">Let's create your article!</div>
      <div className="input-container ic1">
        <input
          value={title}
          type="title"
          onChange={(ev) => setTitle(ev.target.value)}
          id="title"
          className="input"
          placeholder=""
        />
        <div className="cut"></div>
        <label htmlFor="title" className="placeholder">
          Title
        </label>
      </div>
      <div className="input-container ic2">
        <input
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          id="summary"
          className="input"
          type="summary"
          placeholder=""
        />
        <div className="cut"></div>
        <label htmlFor="summary" className="placeholder">
          Summary
        </label>
      </div>
      {/*       <div className="input-container ic2">
        <input
          name="content"
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
          id="content"
          className="input"
          type="text"
          placeholder=""
        />
        <div className="cut cut-short"></div>
        <label htmlFor="content" className="placeholder">
          Content
        </label>
      </div> */}
      <div className="input-container ic2">

        <input
          id="file"
          className="input"
          type="file"
          onChange={ev => setFiles(ev.target.files)} />
        {/*       <input
          type="file"
          // value={null}
          onChange={(ev) => setFiles(ev.target.value)}
          id="file"
          className="input"
          placeholder=""
        /> */}

        <div className="cut cut-short"></div>
        <label htmlFor="file" className="placeholder">
          File
        </label>
      </div>

      <Editor value={content} onChange={setContent} />
      <button className="submit">
        Create Post
      </button>
    </form>
  );
}
/*
 <form className="form" onSubmit={createNewPost}>
      <div className="subtitle">Let's create your article!</div>
      <div className="input-container ic1">
        <input
          value={title}
          type="title"
          onChange={(ev) => setTitle(ev.target.value)}
          id="title"
          className="input"
          placeholder=""
        />
        <div className="cut"></div>
        <label htmlFor="title" className="placeholder">
          Title
        </label>
      </div>
      <div className="input-container ic2">
        <input
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          id="summary"
          className="input"
          type="summary"
          placeholder=""
        />
        <div className="cut"></div>
        <label htmlFor="summary" className="placeholder">
          Summary
        </label>
      </div>
      <div className="input-container ic2">
        <input
          value={files}
          onChange={(ev) => setFiles(ev.target.value)}
          id="file"
          className="input"
          type="file"
          placeholder=""
        />
        <div className="cut cut-short"></div>
        <label htmlFor="file" className="placeholder">
          File
        </label>
      </div>
      <div className="input-container ic2">
        <input
          name="content"
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
          id="content"
          className="input"
          type="text"
          placeholder=""
        />
        <div className="cut cut-short"></div>
        <label htmlFor="content" className="placeholder">
          Content
        </label>
      </div>
      <Editor value={content} onChange={setContent} />
      <button className="submit">
        Create Post
      </button>


    </form> */

import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

export default function EditPostPage() {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

 useEffect(()=> {
    fetch(`http://localhost:3001/api/v1/post/${id}`, {
        credentials: 'include'
    })
    .then(data=> data.json())
    .then(postInfo=> {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
    })
 }, [id])

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files) {
        data.set("file", files[0]);
    }
    ev.preventDefault();
    const response = await fetch(`http://localhost:3001/api/v1/post/${id}`, {
      method: "PATCH",
      body: data,
      credentials: "include"
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
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
      <div className="input-container ic2">
        <input
          id="file"
          className="input"
          type="file"
          onChange={(ev) => setFiles(ev.target.files)}
        />

        <div className="cut cut-short"></div>
        <label htmlFor="file" className="placeholder">
          File
        </label>
      </div>

      <Editor value={content} onChange={setContent} />
      <button className="submit">Create Post</button>
    </form>
  );
}

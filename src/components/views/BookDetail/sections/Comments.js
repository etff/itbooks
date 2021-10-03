import React, { useState } from "react";
import { Button, Input, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import CommentItem from "./Comment";
const { TextArea } = Input;

function Comments(props) {
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: comment,
      writerId: user.userData.id,
      isbn: props.isbn,
    };

    const token = localStorage.getItem("token");
    const config = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;

      axios
        .post(`/api/v1/comments/${props.isbn}`, variables, config)
        .then((response) => {
          if (response.status === 201) {
            setComment("");
            props.refreshFunction(response.data);
          } else {
            message.info("등록에 실패했습니다.");
          }
        });
    }
  };

  return (
    <div>
      <br />
      <p> 사용자 의견</p>
      <hr />
      {props.commentList &&
        props.commentList.length > 0 &&
        props.commentList.map(
          (comment, index) =>
            comment && (
              <CommentItem
                comment={comment}
                isbn={props.isbn}
                refreshFunction={props.refreshFunction}
                deleteFunction={props.deleteFunction}
                key={comment.id}
              />
            )
        )}

      <form style={{ display: "flex", marginTop: "10px" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "1px" }}
          onChange={handleChange}
          value={comment}
          placeholder="책의 의견을 남겨주세요"
        />

        <Button style={{ width: "20%", height: "80px" }} onClick={onSubmit}>
          제출
        </Button>
      </form>
    </div>
  );
}

export default Comments;

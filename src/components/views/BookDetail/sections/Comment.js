import React from "react";
import { Comment, Avatar } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";

function CommentItem(props) {
  const user = useSelector((state) => state.user);
  const deleteComment = () => {
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
        .delete(`/api/v1/comments/${props.isbn}`, config)
        .then((response) => {
          if (response.status === 204) {
            props.deleteFunction(props.comment.id);
          } else {
            message.info("등록에 실패했습니다.");
          }
        });
    }
  };

  const actions = (id) => [
    user.userData.id === id && <span onClick={deleteComment}>삭제하기 </span>,
  ];

  return (
    <Comment
      actions={actions(props.comment.writer.id)}
      author={props.comment.writer.name}
      avatar={<Avatar size="large" icon={<UserOutlined />} alt="profile" />}
      content={<p>{props.comment.content}</p>}
      style={{
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
        padding: 5,
      }}
    />
  );
}

export default CommentItem;

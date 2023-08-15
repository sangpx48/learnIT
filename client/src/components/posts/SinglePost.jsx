import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { Popconfirm, message } from "antd";
import { useDispatch } from "react-redux";
import {
  deletePost,
  findPosts,
  setShowUpdateModal,
} from "../../redux/Reducers/PostReducer";

const SinglePost = ({ post }) => {
  const { _id, title, desciption, url, status } = post;
  const dispatch = useDispatch();

  //handleEditPost
  const handleEditPost = (postId) => {
    dispatch(findPosts(postId));
    dispatch(setShowUpdateModal());
  };

  //handleDeletePost
  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
    message.success("Delete Successfully!");
  };
  return (
    <Card
      className="shadow"
      border={
        status === "LEARNED"
          ? "success"
          : status === "LEARNING"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                variant={
                  status === "LEARNED"
                    ? "success"
                    : status === "LEARNING"
                    ? "warning"
                    : status === "TO LEARN"
                    ? "danger"
                    : ""
                }
              >
                {status}
              </Badge>
            </Col>

            <Col className="text-right">
              <Button className="post-button" href={url} target="_blank">
                <img src={playIcon} alt="playIcon" width="32" height="32" />
              </Button>
              <Button
                className="post-button"
                onClick={() => handleEditPost(post)}
              >
                <img src={editIcon} alt="editIcon" width="24" height="24" />
              </Button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => handleDeletePost(_id)}
                okText="Delete"
                cancelText="Cancel"
              >
                <Button className="post-button">
                  <img
                    src={deleteIcon}
                    alt="deleteIcon"
                    width="24"
                    height="24"
                  />
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        </Card.Title>

        <Card.Text>{desciption}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;

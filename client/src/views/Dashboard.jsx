import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Col from "react-bootstrap/Col";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import NavabarMenu from "../components/layout/NavabarMenu";
import UpdatedPostModal from "../components/posts/UpdatedPostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  loadPosts,
  postsSelector,
  postsLoading,
  setShowModal,
  showUpdateModal,
} from "../redux/Reducers/PostReducer";

const Dashboard = () => {
  const dispatch = useDispatch();

  //context
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const posts = useSelector(postsSelector);

  const showUpdateModals = useSelector(showUpdateModal);
  const isLoading = useSelector(postsLoading);

  const handleShowModal = () => {
    dispatch(setShowModal());
  };

  //loadPosts
  useEffect(() => {
    (async () => {
      await dispatch(loadPosts());
    })();
  }, [dispatch]);

  const [searchData, setSearchData] = useState("");

  let body = null;

  if (isLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant="primary" onClick={handleShowModal}>
              LearnIt!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        {/* Search */}
        <Container>
          <Row md={4}>
            <Col>
              <InputGroup className="my-3">
                <Form.Control
                  size="sm"
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                  placeholder="Search..."
                />
                <InputGroup.Text>Search</InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </Container>

        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts
            .filter((post) => {
              return post.title.includes(searchData);
            })
            .map((post, index) => (
              <Col key={index} className="my-2">
                <SinglePost post={post} />
              </Col>
            ))}
        </Row>

        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <Button className="btn-floating" onClick={handleShowModal}>
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      <NavabarMenu />
      {body}
      <AddPostModal />
      {showUpdateModals && <UpdatedPostModal />}
    </>
  );
};

export default Dashboard;

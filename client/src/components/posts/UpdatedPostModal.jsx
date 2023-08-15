import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import {
  updatePost,
  showUpdateModal,
  setHideUpdateModal,
  postNull,
  loadPosts,
} from "../../redux/Reducers/PostReducer";

const UpdatedPostModal = () => {
  const showUpdateModals = useSelector(showUpdateModal);

  const postSelectEdit = useSelector(postNull);

  const [updatePosts, setUpdatePosts] = useState(postSelectEdit);

  const onChangeUpdatePostForm = (e) => {
    setUpdatePosts({ ...updatePosts, [e.target.name]: e.target.value });
  };

  const { title, desciption, url, status } = updatePosts;

  const dispatch = useDispatch();

  //close Dialog
  const closeDialog = () => {
    setUpdatePosts(postSelectEdit);
    dispatch(setHideUpdateModal());
  };

  //onSubmit handle Edit Post
  const onSubmit = async (e) => {
    e.preventDefault();
    const { title, desciption, status } = dispatch(updatePost(updatePosts));
    dispatch(setHideUpdateModal());
    message.success("Update Successfully!");
    dispatch(loadPosts());
  };

  return (
    <>
      <Modal show={showUpdateModals} animation={true} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Making progress?</Modal.Title>
        </Modal.Header>

        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                required
                aria-describedby="title-help"
                value={title}
                onChange={onChangeUpdatePostForm}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                className="my-4"
                as="textarea"
                rows="3"
                placeholder="Description"
                name="desciption"
                value={desciption}
                onChange={onChangeUpdatePostForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Youtube Tutorial URl"
                name="url"
                value={url}
                onChange={onChangeUpdatePostForm}
              />
            </Form.Group>

            <Form.Group className="mt-4">
              <Form.Control
                as="select"
                value={status}
                name="status"
                onChange={onChangeUpdatePostForm}
              >
                <option value="TO LEARN">TO LEARN</option>
                <option value="LEARNING">LEARNING</option>
                <option value="LEARNED">LEARNED</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatedPostModal;

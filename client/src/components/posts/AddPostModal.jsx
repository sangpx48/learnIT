import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  addNewPost,
  showModal,
  setHideModal,
} from "../../redux/Reducers/PostReducer";

const AddPostModal = () => {
  //State
  const [newPost, setNewPost] = useState({
    title: "",
    desciption: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, desciption, url } = newPost;

  const dispatch = useDispatch();
  const showModals = useSelector(showModal);

  const onChangeNewPostForm = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  //close Dialog
  const closeDialog = () => {
    resetAddPostData();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewPost(newPost));
    message.success("Add Successfully!");
    resetAddPostData();
  };

  //resetAddPostData
  const resetAddPostData = () => {
    setNewPost({
      title: "",
      desciption: "",
      url: "",
      status: "TO LEARN",
    });
    dispatch(setHideModal());
  };

  return (
    <>
      <Modal show={showModals} animation={true} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>What do you want to learn?</Modal.Title>
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
                onChange={onChangeNewPostForm}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                className="my-4"
                as="textarea"
                rows="5"
                placeholder="Description"
                name="desciption"
                value={desciption}
                onChange={onChangeNewPostForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="URL"
                name="url"
                value={url}
                onChange={onChangeNewPostForm}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddPostModal;

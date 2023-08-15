import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../context/Constants";

//loadPosts
export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
  const res = await axios.get(`${apiUrl}/posts`);
  if (res.data.success === true) return res.data;
});

//addNewPost
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const res = await axios.post(`${apiUrl}/posts`, initialPost);
    if (res.data.success === true) return res.data.post;
  }
);

//deletePost
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    const res = await axios.delete(`${apiUrl}/posts/${postId}`);
    if (res.data.success === true) return postId;
  }
);

//updatePost
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatePost) => {
    const res = await axios.put(
      `${apiUrl}/posts/${updatePost._id}`,
      updatePost
    );
    if (res.data.success === true) return res.data;
  }
);

//postSlice
const postSlice = createSlice({
  name: "post",
  initialState: {
    postData: [],
    isLoading: false,
    hassErr: false,
    post: null,
    showModal: false,
    showUpdateModal: false,
  },
  reducers: {
    //find post when user is updating post
    findPosts(state, action) {
      const { _id } = action.payload;
      const existingPost = state.postData.find((post) => post._id === _id);
      if (existingPost) {
        state.post = existingPost;
      }
    },

    setShowModal(state) {
      state.showModal = true;
    },
    setHideModal(state) {
      state.showModal = false;
    },
    setShowUpdateModal(state) {
      state.showUpdateModal = true;
    },
    setHideUpdateModal(state) {
      state.showUpdateModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state, action) => {
        state.isLoading = true;
        state.hassErr = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.postData = action.payload.posts;
        state.isLoading = false;
        state.hassErr = false;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.hassErr = true;
      })
      .addCase(addNewPost.pending, (state, action) => {
        state.isLoading = true;
        state.hassErr = false;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.postData.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.isLoading = false;
        state.hassErr = true;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
        state.hassErr = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload;
        state.postData = state.postData.filter((post) => post._id !== postId);
        state.isLoading = false;
        state.hassErr = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.hassErr = true;
      })
      .addCase(updatePost.pending, (state, action) => {
        state.isLoading = true;
        state.hassErr = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hassErr = false;
        state.postData = state.postData.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.hassErr = true;
      });
  },
});

//create reducer
const postsReducer = postSlice.reducer;

export const {
  findPosts,
  setShowModal,
  setHideModal,
  setShowUpdateModal,
  setHideUpdateModal,
} = postSlice.actions;

//selector
export const postsSelector = (state) => state.postsReducer.postData;

export const postNull = (state) => state.postsReducer.post;

export const postsLoading = (state) => state.postsReducer.isLoading;

export const showModal = (state) => state.postsReducer.showModal;

export const showUpdateModal = (state) => state.postsReducer.showUpdateModal;

export default postsReducer;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [] as any[],
  folders: [] as any[],
  selectedPostId: null as string | null,
};

const pazzaSlice = createSlice({
  name: "pazza",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts = [payload, ...state.posts];
    },
    updatePost: (state, { payload }) => {
      state.posts = state.posts.map((p: any) =>
        p._id === payload._id ? payload : p
      );
    },
    deletePost: (state, { payload: postId }) => {
      state.posts = state.posts.filter((p: any) => p._id !== postId);
    },
    setFolders: (state, { payload }) => {
      state.folders = payload;
    },
    addFolder: (state, { payload }) => {
      state.folders = [...state.folders, payload];
    },
    updateFolder: (state, { payload }) => {
      state.folders = state.folders.map((f: any) =>
        f._id === payload._id ? payload : f
      );
    },
    deleteFolders: (state, { payload: ids }) => {
      state.folders = state.folders.filter((f: any) => !ids.includes(f._id));
    },
    setSelectedPostId: (state, { payload }) => {
      state.selectedPostId = payload;
    },
  },
});

export const {
  setPosts,
  addPost,
  updatePost,
  deletePost,
  setFolders,
  addFolder,
  updateFolder,
  deleteFolders,
  setSelectedPostId,
} = pazzaSlice.actions;
export default pazzaSlice.reducer;
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const POSTS_API = `${HTTP_SERVER}/api/pazza/posts`;

export const findPostsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/pazza/posts`);
  return data;
};

export const createPost = async (courseId: string, post: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/pazza/posts`, post);
  return data;
};

export const updatePost = async (post: any) => {
  const { data } = await axios.put(`${POSTS_API}/${post._id}`, post);
  return data;
};

export const deletePost = async (postId: string) => {
  const { data } = await axios.delete(`${POSTS_API}/${postId}`);
  return data;
};

export const incrementPostView = async (postId: string) => {
  const { data } = await axios.post(`${POSTS_API}/${postId}/view`);
  return data;
};

export const createAnswer = async (postId: string, answer: any) => {
  const { data } = await axios.post(`${POSTS_API}/${postId}/answers`, answer);
  return data;
};

export const updateAnswer = async (postId: string, answer: any) => {
  const { data } = await axios.put(
    `${POSTS_API}/${postId}/answers/${answer._id}`,
    answer
  );
  return data;
};

export const deleteAnswer = async (postId: string, answerId: string) => {
  const { data } = await axios.delete(`${POSTS_API}/${postId}/answers/${answerId}`);
  return data;
};

export const createFollowup = async (postId: string, followup: any) => {
  const { data } = await axios.post(`${POSTS_API}/${postId}/followups`, followup);
  return data;
};

export const updateFollowup = async (postId: string, followup: any) => {
  const { data } = await axios.put(
    `${POSTS_API}/${postId}/followups/${followup._id}`,
    followup
  );
  return data;
};

export const deleteFollowup = async (postId: string, followupId: string) => {
  const { data } = await axios.delete(`${POSTS_API}/${postId}/followups/${followupId}`);
  return data;
};

export const createReply = async (postId: string, followupId: string, reply: any) => {
  const { data } = await axios.post(
    `${POSTS_API}/${postId}/followups/${followupId}/replies`,
    reply
  );
  return data;
};

export const updateReply = async (postId: string, followupId: string, reply: any) => {
  const { data } = await axios.put(
    `${POSTS_API}/${postId}/followups/${followupId}/replies/${reply._id}`,
    reply
  );
  return data;
};

export const deleteReply = async (
  postId: string,
  followupId: string,
  replyId: string
) => {
  const { data } = await axios.delete(
    `${POSTS_API}/${postId}/followups/${followupId}/replies/${replyId}`
  );
  return data;
};

export const findFoldersForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/pazza/folders`);
  return data;
};

export const createFolder = async (courseId: string, folder: any) => {
  const { data } = await axios.post(
    `${COURSES_API}/${courseId}/pazza/folders`,
    folder
  );
  return data;
};

export const updateFolder = async (folder: any) => {
  const { data } = await axios.put(
    `${HTTP_SERVER}/api/pazza/folders/${folder._id}`,
    folder
  );
  return data;
};

export const deleteFolders = async (courseId: string, ids: string[]) => {
  const { data } = await axios.post(
    `${COURSES_API}/${courseId}/pazza/folders/delete`,
    { ids }
  );
  return data;
};
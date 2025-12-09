import commentModel from './commentModel.js';
import * as postRepo from '../post/postRepo.js';
export const getCommentsByPostId = (postId) => {
const comments = commentModel.find({ postId: postId });
const totalComments = comments.length;
return comments;
};

export const addCommentToPost = async (postId, userId, text) => {
    const comment = await commentModel.create({ postId, userId, text });
    return comment;
};

// get comment by id
 export const getComment = async (commentId) => {
    const comment = await commentModel.findById(commentId);
    return comment;
} ;

export const editComment = async (commentId, text) => {
    const comment = await commentModel.findByIdAndUpdate(commentId, { text }, { new: true });
    return comment;
};

export const deleteComment = async (commentId) => {
    await commentModel.findByIdAndDelete(commentId);
    return;
};

export const countPostComments = async (commentId) => {
    const totalComments = await commentModel.countDocuments(commentId);
    return totalComments;
 }
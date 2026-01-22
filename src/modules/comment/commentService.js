import * as commentRepo from './commentRepo.js';
import * as postRepo from '../post/postRepo.js';
import AppError from '../../core/errors/appError.js';
import { ERROR_CODES } from '../../core/errors/errorCodes.js';
import { isOwnerOrAdmin } from '../../core/utils/ownership.js';

export const addComment = async ({ postId, userId, text }) => {
    const post = await postRepo.getPostById(postId);
    if (!post) {
        throw new AppError(ERROR_CODES.POST_NOT_FOUND);
    };
    const comment = await commentRepo.addCommentToPost({ postId, userId, text });
    return comment;
};

export const getCommentsByPostId = async (postId) => {
    const comments = await commentRepo.getCommentsByPostId(postId);
    const totalComments = comments.length;
    if (!comments || comments.length === 0) {
        throw new AppError( ERROR_CODES.NO_COMMENTS_YET);
    };
    return { totalComments, comments }
};

export const editComment = async (commentId, userId, text) => {
    const comment = await commentRepo.getComment(commentId);
    if (!comment) {
        throw new AppError(ERROR_CODES.COMMENT_NOT_FOUND);
    };
    isOwnerOrAdmin(comment.userId, { id: userId, role: user.role });
    const updatedComment = await commentRepo.editComment(commentId, text);
    return updatedComment;
};

export const deleteComment = async ({ commentId, userId }) => {
  if (!commentId || !userId) {
    throw new AppError(ERROR_CODES.INVALID_REQUEST);
  };
  const comment = await commentRepo.getComment(commentId);
  if (!comment) {
    throw new AppError( ERROR_CODES.COMMENT_NOT_FOUND);
  }
  isOwnerOrAdmin(comment.userId, { id: userId, role: userId.role });
  await commentRepo.deleteComment(commentId);
};

export const getComment = async (commentId) => {
  const comment = await commentRepo.getComment(commentId);
  if (!comment) {
    throw new AppError(ERROR_CODES.COMMENT_NOT_FOUND);
  };
  return comment;
}
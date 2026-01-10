import { ERROR_CODES } from "../../core/errors/errorCodes.js";
import AppError from '../../core/errors/appError.js';
import * as postRepo from './postRepo.js';
import * as commentRepo from '../comment/commentRepo.js';
import { isOwnerOrAdmin } from "../../core/utils/ownership.js";

//get all posts 
export const getAllPosts = async () => {
    const posts = await postRepo.getAllPosts();
    return posts;
};

// create post 
export const createPost = async ({ title, content, category, userId, page }) => {
    const postsPerPage = 10;
    const pageNumber = Math.max(page - 1, 0);
    const newPost = await postRepo.createPost({ 
        title: title, 
        content: content, 
        category: category, 
        userId: userId 
    });
    const posts = await postRepo.getPaginated(pageNumber, postsPerPage);
    const totalPosts = await postRepo.countPosts();
    return { newPost, posts, totalPosts };  
};

// get post by id
export const getPostById = async (_id) => {
    const post = await postRepo.getPostById(_id);
    if (!post) {
        const { code, message, statusCode } =ERROR_CODES.POST_NOT_FOUND;
        throw new AppError(message, statusCode, code);
    }
     const totalComments = await commentRepo.countPostComments();
    return { post, totalComments };

};

// update post
export const updatePost = async (id, postData, userId) => {
    const existingPost = await postRepo.getPostById(id);
    if (!existingPost) {
        const { code, message, statusCode } = ERROR_CODES.POST_NOT_FOUND
        throw new AppError(message, statusCode, code);
    }
    isOwnerOrAdmin(existingPost.userId, { id: userId });
    const updatedPost = await postRepo.updatePost(id, postData);
    return updatedPost;
};

// delete post:
export const deletePost = async (id, userId) => {
    const existingPost = await postRepo.getPostById(id);
    if (!existingPost) {
        const { message, statusCode, code } = ERROR_CODES.POST_NOT_FOUND;
        throw new AppError(message, statusCode, code);
    };
    isOwnerOrAdmin(existingPost.userId, { id: userId });
    await postRepo.deletePost(id);
};

// get posts by user id 
export const getPostsByUserId = async (userId) => {
    const posts = await postRepo.getPostsByUserId(userId);
    if (!posts || posts.length === 0 ) {
        const { code, message, statusCode } = ERROR_CODES.POST_UNAVAILABLE;
        throw new AppError(message, statusCode, code);
    }
    return posts;
};

    // get posts by category
export const getPostsByCategory = async (category) => {
    const posts = await postRepo.getPostsByCategory(category);
     if (!posts || posts.length === 0 ) {
        const { code, message, statusCode } = ERROR_CODES.POST_NOT_FOUND;
        throw new AppError(message, statusCode, code);
     }
    return posts;
};

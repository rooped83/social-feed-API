import { vi, test, describe, expect, beforeEach } from 'vitest';
import * as postRepo from '../../../src/modules/post/postRepo.js'; 
import * as postService from '../../../src/modules/post/postService.js'; 
import * as userRepo from '../../../src/modules/user/userRepo.js'; 
import * as commentRepo from '../../../src/modules/comment/commentRepo.js'; 
import AppError from '../../../src/core/errors/appError.js'; 
import { isOwnerOrAdmin } from '../../../src/core/utils/ownership.js';
vi.mock('../../../src/modules/post/postRepo.js', () => ({ 
    getPostById: vi.fn(),
     deletePost: vi.fn(), 
     createPost: vi.fn(),
      getPaginated: vi.fn(),
       countPosts: vi.fn() 
    }));
vi.mock('../../../src/modules/user/userRepo.js', () => ({
     getUserById: vi.fn() 
    })); 
vi.mock('../../../src/modules/comment/commentRepo.js', () => ({
     countPostComments: vi.fn() 
    })); 
    vi.mock('../../../src/core/utils/ownership.js', () => ({
     isOwnerOrAdmin: vi.fn() 
    })); 
    
describe('create Post logic', () => {
     test('creates post successfully when user exists', async () => {
        userRepo.getUserById.mockResolvedValue({ userId: '1' });
        postRepo.createPost.mockResolvedValue({ _id: '101' }); 
        postRepo.getPaginated.mockResolvedValue([]); 
        postRepo.countPosts.mockResolvedValue(1); 
        const result = await postService.createPost({ 
            title: 'Test', content: 'wsp guys', category: 'Test', userId: '1', page: 1, 
        }); 
expect(postRepo.createPost).toHaveBeenCalledWith({ title: 'Test', content: 'wsp guys', category: 'Test', userId: '1', }); 
expect(result).toEqual({ newPost: { _id: '101' }, posts: [], totalPosts: 1 }); }); }); 

describe('deletePost', () => {

  test('throws if post does not exist', async () => {
    postRepo.getPostById.mockResolvedValue(null);

    await expect(
      postService.deletePost(1, 10)
    ).rejects.toBeInstanceOf(AppError);
    expect(postRepo.deletePost).not.toHaveBeenCalled();
  });

  test('throws if user is not owner nor admin', async () => {
    postRepo.getPostById.mockResolvedValue({
      id: 1,
      userId: 99, 
    });
    isOwnerOrAdmin.mockImplementation(() => {
      throw new AppError('Forbidden', 403, 'FORBIDDEN');
    });
    await expect(
      postService.deletePost(1, 10) 
    ).rejects.toBeInstanceOf(AppError);
    expect(postRepo.deletePost).not.toHaveBeenCalled();
  });

  test('deletes post successfully when user is owner or admin', async () => {
    postRepo.getPostById.mockResolvedValue({
      id: 1,
      userId: 10,
    });
    isOwnerOrAdmin.mockImplementation(() => true);
    await postService.deletePost(1, 10);
    expect(isOwnerOrAdmin).toHaveBeenCalledWith(10, { id: 10 });
    expect(postRepo.deletePost).toHaveBeenCalledWith(1);
  });

});
describe('get post by id function', () => { 
    test('throws an error if post does not exist', async () => {
    postRepo.getPostById.mockResolvedValue(null); 
    await expect(postService.getPostById('1') ).rejects.toBeInstanceOf(AppError); 
}); 

test('returns the post if exists', async () => { 
    const post = { postId: '1' }; 
    postRepo.getPostById.mockResolvedValue(post); 
    const totalComments = '1'; 
    commentRepo.countPostComments.mockResolvedValue(totalComments);
    const result = await postService.getPostById(post.postId); 
expect(result).toEqual({ post, totalComments }); }) })
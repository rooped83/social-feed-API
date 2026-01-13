import { vi, test, describe, beforeEach, expect } from 'vitest'; 
import * as commentRepo from '../../../src/modules/comment/commentRepo.js'; 
import * as commentService from '../../../src/modules/comment/commentService.js'; 
import * as userRepo from '../../../src/modules/user/userRepo.js'; 
import { addComment } from '../../../src/modules/comment/commentService.js'; 
import * as postRepo from '../../../src/modules/post/postRepo.js'; 
import AppError from '../../../src/core/errors/appError.js';
import { isOwnerOrAdmin } from '../../../src/core/utils/ownership.js'; 

vi.mock('../../../src/modules/post/postRepo.js', () => ({
     getPostById: vi.fn() 
    })); 
vi.mock('../../../src/modules/comment/commentRepo.js', () => ({ 
    addCommentToPost: vi.fn(), 
    getComment: vi.fn(), 
    deleteComment: vi.fn(), 
   })); 
vi.mock('../../../src/modules/user/userRepo.js', () => ({ 
    getUserById: vi.fn() 
})); 
vi.mock('../../../src/core/utils/ownership.js', () => ({
    isOwnerOrAdmin: vi.fn() 
}))

describe(' add comment service ', async () => { 
    test('throws if post does not exist', async () => { 
        postRepo.getPostById.mockResolvedValue(null); 
        await expect( addComment({ postId: 1, userId: 2, text: 'hi' }) 
                      ).rejects.toBeInstanceOf(AppError); }); 
beforeEach(() => {
     vi.clearAllMocks(); 
    }) 

    test('adding comment when post exits', async() => {
        postRepo.getPostById.mockResolvedValue({ postId: 1 }); 
        userRepo.getUserById.mockResolvedValue({ userId: 10 }); 
        commentRepo.addCommentToPost.mockResolvedValue({ id: 11 }); 
        const result = await addComment({ userId:10, postId: 1, text: "ausgezeichnet bruder !" }) 
        expect(commentRepo.addCommentToPost).toHaveBeenCalledWith({ postId: 1, userId: 10, text: "ausgezeichnet bruder !" }); 
        expect(result.id).toBe(11); }); }) 
        
describe('deleteComment service', () => {
    test('should throw INVALID_REQUEST error when commentId is missing', async () => {
      await expect(
        commentService.deleteComment({ commentId: null, userId: 'user123' })
      ).rejects.toThrow(AppError);
    });
});

    test('throws error when not the comment owner', async () => { 
            commentRepo.getComment.mockResolvedValue({ userId: 1, commentId: 1}) 
            isOwnerOrAdmin.mockImplementation(() => { throw new AppError('Forbidden', 403, 'FORBIDDEN') });
            await expect( commentService.deleteComment({ userId: 2, commentId: 1 }) 
                          ).rejects.toBeInstanceOf(AppError) 
        });
        
beforeEach(() => { vi.clearAllMocks(); }) ; 
    
   test('delete comment successfully', async () => { 
            const comment = { userId: '1', commentId: '1' };   
            commentRepo.getComment.mockResolvedValue(comment.commentId); 
            isOwnerOrAdmin.mockImplementation(() => true);
            commentRepo.deleteComment = vi.fn().mockResolvedValue(true); 
            await commentService.deleteComment({ commentId: '1', userId: '1' }); 
            expect(commentRepo.deleteComment).toHaveBeenCalledWith('1'); 
        }); 
            
describe('getComment function', () => { 
    test('throws error when comment does not exist', async () => { 
        commentRepo.getComment.mockResolvedValue(null); 
 await expect( commentService.getComment({ id: 1 }) ).rejects.toBeInstanceOf(AppError); }) });
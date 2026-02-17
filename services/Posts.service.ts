import { postsRepository } from "@/repositories/Posts.repository";
import {
  Post,
  CreatePostData,
  CreateCommentData,
} from "@/types/Post.types";


export class PostsService {

  async getPosts(page: number = 1): Promise<Post[]> {
    try {
      return await postsRepository.getPosts(page);
    } catch (error) {
      throw error;
    }
  }


  async getPostById(id: string): Promise<Post> {
    try {
      return await postsRepository.getPostById(id);
    } catch (error) {
      throw error;
    }
  }


  async createPost(data: CreatePostData): Promise<Post> {
    try {
      // Validation can be added here
      if (!data.body || data.body.trim().length === 0) {
        throw new Error("Post content cannot be empty");
      }

      return await postsRepository.createPost(data);
    } catch (error) {
      throw error;
    }
  }

//   async updatePost(id: string, data: Partial<CreatePostData>): Promise<Post> {
//     try {
//       return await postsRepository.updatePost(id, data);
//     } catch (error) {
//       throw error;
//     }
//   }

//   async deletePost(id: string): Promise<void> {
//     try {
//       await postsRepository.deletePost(id);
//     } catch (error) {
//       throw error;
//     }
//   }

  async createComment(data: CreateCommentData): Promise<Comment> {
    try {
      // Validation
      if (!data.content || data.content.trim().length === 0) {
        throw new Error("Comment content cannot be empty");
      }

      if (!data.post) {
        throw new Error("Post ID is required");
      }

      return await postsRepository.createComment(data);
    } catch (error) {
      throw error;
    }
  }

  async loadMorePosts(currentPosts: Post[], page: number): Promise<Post[]> {
    try {
      const newPosts = await this.getPosts(page);
      return [...currentPosts, ...newPosts];
    } catch (error) {
      throw error;
    }
  }
}

export const postsService = new PostsService();
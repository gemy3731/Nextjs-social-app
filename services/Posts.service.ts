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

      if ((!data.body || data.body.trim().length === 0)&& !data.image) {
        throw new Error("Post content cannot be empty");
      }

      return await postsRepository.createPost(data);
    } catch (error) {
      throw error;
    }
  }


  async createComment(data: CreateCommentData): Promise<Comment> {
    try {

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

}

export const postsService = new PostsService();
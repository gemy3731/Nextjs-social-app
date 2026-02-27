import {
  Post,
  PostsResponse,
  SinglePostResponse,
  CreatePostData,
  CreateCommentData,
} from "@/types/Post.types";
import { apiClient } from "@/utils/apiClient";


export class PostsRepository {
  private readonly basePath = "/post";
  private readonly commentsPath = "/comment";




  async getPosts(page: number = 1): Promise<Post[]> {
    try {
      const response = await apiClient.get<PostsResponse>(`${this.basePath}?page=${page}`
      );
      return response.posts;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPostById(id: string): Promise<Post> {
    try {
      const response = await apiClient.get<SinglePostResponse>(`${this.basePath}/${id}`);
      return response.post;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createPost(data: CreatePostData): Promise<Post> {
    try {
      const formData = new FormData();
      if(data.body){
        formData.append("body", data.body);
      }
      
      if (data.image) {
        formData.append("image", data.image);
      }
      
      const response = await apiClient.post<{ post: Post }>(this.basePath,formData);
      return response.post;
    } catch (error) {
      throw this.handleError(error);
    }
  }


  async createComment(data: CreateCommentData): Promise<Comment> {
    try {
      const response = await apiClient.post<{ comment: Comment }>(`${this.basePath}/${data.post}${this.commentsPath}`,{content:data.content});
      return response.comment;
    } catch (error) {
      throw this.handleError(error);
    }
  }
//eslint-disable-next-line
  private handleError(error: any): Error {
    if (error.response) {
      const message =
        error.response.data?.error ||
        error.response.data?.message ||
        "An error occurred";
      const err = new Error(message);
      //eslint-disable-next-line
      (err as any).statusCode = error.response.status;
      return err;
    } else if (error.request) {
      return new Error("Network error. Please check your connection.");
    } else {
      return new Error(error.message || "An unexpected error occurred");
    }
  }
}

export const postsRepository = new PostsRepository();
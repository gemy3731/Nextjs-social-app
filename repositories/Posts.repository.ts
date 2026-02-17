import {
  Post,
  PostsResponse,
  SinglePostResponse,
  CreatePostData,
  CreateCommentData,
} from "@/types/Post.types";
import { TokenCookie } from "../utils/cookies";
import { apiClient } from "@/utils/apiClient";


export class PostsRepository {
  private readonly basePath = "/posts";
  private readonly commentsPath = "/comments";


  private getAuthHeader() {
    const token = TokenCookie.get();
    return token ? { token } : {};
  }


  async getPosts(page: number = 1): Promise<Post[]> {
    try {
      const response = await apiClient.get<PostsResponse>(
        `${this.basePath}?page=${page}`,
        {
          headers: this.getAuthHeader(),
        }
      );
      return response.posts;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPostById(id: string): Promise<Post> {
    try {
      const response = await apiClient.get<SinglePostResponse>(
        `${this.basePath}/${id}`,
        {
          headers: this.getAuthHeader(),
        }
      );
      return response.post;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createPost(data: CreatePostData): Promise<Post> {
    try {
      const formData = new FormData();
      formData.append("body", data.body);
      
      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await apiClient.post<{ post: Post }>(
        this.basePath,
        formData,
        {
          headers: {
            ...this.getAuthHeader(),
            // Let browser set Content-Type for FormData
          },
        }
      );
      return response.post;
    } catch (error) {
      throw this.handleError(error);
    }
  }

//   async updatePost(id: string, data: Partial<CreatePostData>): Promise<Post> {
//     try {
//       const formData = new FormData();
      
//       if (data.body) {
//         formData.append("body", data.body);
//       }
      
//       if (data.image) {
//         formData.append("image", data.image);
//       }

//       const response = await apiClient.put<{ post: Post }>(
//         `${this.basePath}/${id}`,
//         formData,
//         {
//           headers: this.getAuthHeader(),
//         }
//       );
//       return response.post;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async deletePost(id: string): Promise<void> {
//     try {
//       await apiClient.delete(`${this.basePath}/${id}`, {
//         headers: this.getAuthHeader(),
//       });
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

  async createComment(data: CreateCommentData): Promise<Comment> {
    try {
      const response = await apiClient.post<{ comment: Comment }>(
        this.commentsPath,
        data,
        {
          headers: this.getAuthHeader(),
        }
      );
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
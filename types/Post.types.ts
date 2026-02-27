export interface Post {
    _id: string;
    body: string;
    image?: string;
    user: {
      _id: string;
      name: string;
    };
    createdAt: string;
    comments: Comment[];
    likes?: string[];
  }
  
  export interface Comment {
    _id: string;
    content: string;
    commentCreator: {
      _id: string;
      name: string;
    };
    post: string;
    createdAt: string;
  }
  
  export interface CreatePostData {
    body: string;
    image?: File;
  }
  
  export interface CreateCommentData {
    content: string;
    post: string;
  }
  
  export interface PostsResponse {
    posts: Post[];
    paginationInfo?: {
      currentPage: number;
      numberOfPages: number;
      limit: number;
    };
  }
  
  export interface SinglePostResponse {
    post: Post;
  }
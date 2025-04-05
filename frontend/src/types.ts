export interface CommentType {
  id: number;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface PostType {
  id: number;
  username: string;
  avatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  commentList?: CommentType[];
} 
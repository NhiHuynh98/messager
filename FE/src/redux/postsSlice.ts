import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiService from "../services/apiService";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>("posts/fetchPosts", async () => {
  return await apiService.get<Post[]>("/posts");
});

export const createPost = createAsyncThunk<Post, Omit<Post, "id">>(
  "posts/createPost",
  async (postData) => {
    return await apiService.post<Post>("/posts", postData);
  }
);

export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (postId) => {
    await apiService.delete(`/posts/${postId}`);
    return postId; // Return postId so we can remove it from the state
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!";
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.unshift(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiService from "../services/apiService";

import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export interface Message {
    replace(arg0: RegExp, arg1: string): string;
    id: number;
    sender: string;
    destinations: {
        to: string;
    }
    content: {
        body: {
          text: string
          type: string
        }
      }
}

interface MessageState {
    messages: Message[];
    loading: boolean;
    error: string | null;
}

const initialState: MessageState = {
    messages: [],
    loading: false,
    error: null,
};

export const fetchMessages = createAsyncThunk<Message[]>("messages/fetchMessages", async () => {
    return await apiService.get<Message[]>("/messages");
});


export const createMessage = createAsyncThunk<Message, Omit<Message, "id">>(
  "messages/addMessage",
  async (data) => {
    return new Promise<Message>((resolve, reject) => {
      socket.emit("sendMessage", data, (response: { success: boolean; message?: Message; error?: string }) => {
        if (response.success && response.message) {
          resolve(response.message);
        } else {
          reject(response.error || "Failed to send message");
        }
      });
    });
  }
);

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMessages.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
          state.loading = false;
          state.messages = action.payload;
        })
        .addCase(fetchMessages.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Something went wrong!";
        })
        .addCase(createMessage.fulfilled, (state, action: PayloadAction<Message>) => {
          state.messages.unshift(action.payload);
        })
    },
  });
  
  export default messageSlice.reducer;

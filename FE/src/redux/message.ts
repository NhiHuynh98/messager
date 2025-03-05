import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiService from "../services/apiService";

import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export interface Message {
  map(arg0: (mess: any) => any): unknown;
  replace(arg0: RegExp, arg1: string): string;
  id: number;
  sender: string;
  destinations: {
    to: string;
  };
  content: {
    body: {
      text: string;
      type: string;
    };
  };
}

interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  mode: string | null;
  keyLengthDH: string | null;
  keyLengthECC: string | null;
  keyLengthRSA: string | null;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
  mode: null,
  keyLengthDH: "1024",
  keyLengthECC: "P-256",
  keyLengthRSA: "1024"
};

export const fetchMessages = createAsyncThunk<Message[]>(
  "messages/fetchMessages",
  async () => {
    return await apiService.get<Message[]>("/messages");
  }
);

export const createMessage = createAsyncThunk<Message, any>(
  "messages/addMessage",
  async (data) => {
    console.log("data", data);
    return new Promise<Message>((resolve, reject) => {
      socket.emit(
        "sendMessage",
        data,
        (response: { success: boolean; message?: Message; error?: string }) => {
          if (response.success && response.message) {
            resolve(JSON.parse(response.message));
          } else {
            reject(response.error || "Failed to send message");
          }
        }
      );
    });
  }
);

export const changeMode = createAsyncThunk<string, string>(
  "app/changeMode",
  async (mode) => {
    return new Promise<string>((resolve, reject) => {
      socket.emit(
        "changeMode",
        mode,
        (response: { success: boolean; result?: string; error?: string }) => {
          if (response.success && response.result) {
            resolve(response.result);
          } else {
            reject(response.error || "Failed to change mode");
          }
        }
      );
    });
  }
);

export const changeKeyLengthDH = createAsyncThunk<string, string>(
  "app/changeKeyLengthDH",
  async (mode) => {
    return new Promise<string>((resolve, reject) => {
      socket.emit(
        "changeKeyLengthDH",
        mode,
        (response: { success: boolean; result?: string; error?: string }) => {
          if (response.success && response.result) {
            resolve(response.result);
          } else {
            reject(response.error || "Failed to change length");
          }
        }
      );
    });
  }
);

export const changeKeyLengthECC = createAsyncThunk<string, string>(
  "app/changeKeyLengthECC",
  async (mode) => {
    return new Promise<string>((resolve, reject) => {
      socket.emit(
        "changeKeyLengthECC",
        mode,
        (response: { success: boolean; result?: string; error?: string }) => {
          if (response.success && response.result) {
            resolve(response.result);
          } else {
            reject(response.error || "Failed to change length");
          }
        }
      );
    });
  }
);

export const changeKeyLengthRSA = createAsyncThunk<string, string>(
  "app/changeKeyLengthRSA",
  async (mode) => {
    return new Promise<string>((resolve, reject) => {
      socket.emit(
        "changeKeyLengthRSA",
        mode,
        (response: { success: boolean; result?: string; error?: string }) => {
          if (response.success && response.result) {
            resolve(response.result);
          } else {
            reject(response.error || "Failed to change length");
          }
        }
      );
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
      .addCase(
        fetchMessages.fulfilled,
        (state, action: PayloadAction<Message[]>) => {
          state.loading = false;
          state.messages = action.payload;
        }
      )
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!";
      })
      .addCase(
        createMessage.fulfilled,
        (state, action: PayloadAction<Message>) => {
          state.messages = [action.payload, ...state.messages];
        }
      )
      .addCase(changeMode.fulfilled, (state, action: PayloadAction<string>) => {
        state.mode = action.payload;
      })
      .addCase(changeKeyLengthDH.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeKeyLengthDH.fulfilled, (state, action: PayloadAction<string>) => {
        state.keyLengthDH = action.payload;
        state.loading = false;
      })
      .addCase(changeKeyLengthECC.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeKeyLengthECC.fulfilled, (state, action: PayloadAction<string>) => {
        state.keyLengthECC = action.payload;
        state.loading = false;
      })
      .addCase(changeKeyLengthRSA.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeKeyLengthRSA.fulfilled, (state, action: PayloadAction<string>) => {
        state.keyLengthRSA = action.payload;
        state.loading = false;
      })
  }
});


export default messageSlice.reducer;

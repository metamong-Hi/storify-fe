
// store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { useAppSelector } from '@/hooks/useAppSelector';
interface UserState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  token: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'user/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+`/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error('로그인 망함');
      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
    }
  }
);

export const logout = createAsyncThunk(
    'user/logout',
    async (_, { getState, rejectWithValue }) => {
      const state = getState() as RootState;
      const token = state.user.token;
      if (!token) {
        return rejectWithValue('No token found');
      }
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('로그아웃 실패: 서버 응답 오류');
        }
  
        return '로그아웃 성공';
      } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred during logout");
      }
    }
  );
 
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
        console.log(localStorage.getItem('token'));
        console.log('로그인 성공:', action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        console.log('로그인 실패:', action.payload);
      })
      .addCase(logout.fulfilled, (state,action) => {
        state.status = 'idle';
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'));
        state.token = null;
      })
  },
});

export default userSlice.reducer;

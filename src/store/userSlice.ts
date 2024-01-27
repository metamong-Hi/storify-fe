'use client';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { useAppSelector } from '@/hooks/useAppSelector';
import { sign } from 'crypto';
interface UserState {
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    username: string | null;
}

const initialState: UserState = {
    token: null,
    status: 'idle',
    error: null,
    username: null,
};
export const signup = createAsyncThunk(
    'user/signup',
    async ({ username, password,email }: { username: string; password: string; email:string }, { rejectWithValue }) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password,email }),
            });
            if (!response.ok) throw new Error('회원가입 망함');
            const data = await response.json();
            return {

            }; 
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'An unknown error occurred',
            );
        }
    },
);
export const login = createAsyncThunk(
    'user/login',
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) throw new Error('로그인 망함');
            const data = await response.json();
            return { accessToken: data.accessToken, username: data.username }; // 예시, 실제 응답 구조에 따라 다를 수 있음
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'An unknown error occurred',
            );
        }
    },
);

export const logout = createAsyncThunk('user/logout', async (_, { getState, rejectWithValue }) => {
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
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('로그아웃 실패: 서버 응답 오류');
        }

        return '로그아웃 성공';
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'An unknown error occurred during logout',
        );
    }
});

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
                state.token = action.payload.accessToken; // 수정된 부분
                state.username = action.payload.username;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', action.payload.accessToken);
                    localStorage.setItem('username', action.payload.username);

                    console.log(localStorage.getItem('token'));
                    console.log(localStorage.getItem('username'));
                }

                console.log('로그인 성공:', action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
                console.log('로그인 실패:', action.payload);
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.status = 'idle';
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    console.log(localStorage.getItem('token'));
                }
                state.token = null;
            })



            .addCase(signup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.token = action.payload.accessToken; // 수정된 부분
                // state.username = action.payload.username;
                if (typeof window !== 'undefined') {
                    // localStorage.setItem('token', action.payload.accessToken);
                    // localStorage.setItem('username', action.payload.username);

                    console.log("회원가입 성공함");
                }

                console.log("회원가입 성공함");
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
                console.log('회원가입 실패:', action.payload);
            });
    },
});

export default userSlice.reducer;

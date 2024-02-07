
import { store } from '../store/index';
import { refreshAccessToken } from '../store/userSlice';

async function apiService(endpoint: string, options?: RequestInit) {
    try {
        console.log("API 서비스 호출됨");
        
        // const token = localStorage.getItem('token');
        const token=sessionStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        console.log("apiService에서 토큰 불러옴: " + token);
        console.log("Header: ", headers);
        
        let response = await fetch(`${endpoint}`, {
            ...options,
            headers,
        });
        console.log("Response: ", response);

        if (response.status === 401) {
            console.log("401 에러 감지됨, 토큰 재발급 시도");
            const refreshAction = await store.dispatch(refreshAccessToken());
            if (refreshAccessToken.fulfilled.match(refreshAction)) {
                const newToken = refreshAction.payload.accessToken;
                headers['Authorization'] = `Bearer ${newToken}`;

                response = await fetch(`${endpoint}`, {
                    ...options,
                    headers,
                });
                console.log("재시도 Response: ", response);

                if (!response.ok) {
                    throw new Error('요청 재시도 실패');
                }
            } else {
                throw new Error('토큰 재발급 실패');
            }
        }

        return response;
    } catch (error) {
        console.error("API 서비스 오류: ", error);
        throw error; 
    }
}

export default apiService;

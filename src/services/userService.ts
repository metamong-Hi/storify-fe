const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = sessionStorage.getItem('token');

interface UserProps {
  _id: string;
  password: string;
  email: string;
  createdAt: Date;
  __v: number;
  refreshToken: string;
  userId: string;
  nickname: string;
}

export async function updateUserPassword(oldPassword: string, newPassword: string): Promise<void> {
  try {
    await fetch(`${API_URL}/auth/password`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    }).then(async (response) => {
      const data = await response.json();

      if (data.message === '비밀번호를 확인해주세요.') {
        alert('현재 비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      } else {
        alert('비밀번호 업데이트 성공');
      }
    });
  } catch (error) {
    console.error('비밀번호 업데이트 실패: ', error);
  }
}

export async function updateUserEmail(email: string): Promise<void> {
  const token = sessionStorage.getItem('token');

  try {
    await fetch(`${API_URL}/users`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (data.message === '이메일을 확인해주세요.') {
          alert('이메일 형식을 확인해주세요.');
        } else {
          alert('이메일 업데이트 성공');
        }
      })
      .catch((error) => {
        console.error('이메일 업데이트 실패: ', error);
      });
  } catch (error) {
    console.error('이메일 업데이트 실패: ', error);
  }
}

export async function updateUserProfile(
  nickname: string,
  avatar: File | string,
  introduction: string,
): Promise<void> {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const formData = new FormData();

    if (avatar instanceof File) {
      formData.set('avatar', avatar);
    }
    if (nickname) {
      formData.set('nickname', nickname);
    }
    if (introduction) {
      formData.set('introduction', introduction);
    }

    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
  } catch (error) {
    console.error('프로필 업데이트 실패: ', error);
  }
}

export async function getUserInfo(_id: string): Promise<UserProps | null> {
  if (!_id ?? _id === '') {
    return null;
  }
  const response = await fetch(`${API_URL}/users/${_id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
}

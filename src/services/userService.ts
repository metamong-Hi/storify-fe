import { ProfileData } from '@/types/user';
import Swal from 'sweetalert2';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

export async function updateUserPassword(oldPassword: string, newPassword: string): Promise<void> {
  try {
    if (!token) throw new Error('No token found');
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
  try {
    if (!token) throw new Error('No token found');
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
    if (!token) throw new Error('No token found');

    const formData = new FormData();

    if (avatar instanceof File) {
      formData.set('avatar', avatar);
    }
    if (nickname) {
      if (nickname.length > 10) {
        throw Error('닉네임은 10자 이내로 입력해주세요.');
      }
      if (nickname.length < 2) {
        throw Error('닉네임은 2자 이상 입력해주세요.');
      }

      if (nickname.match(/^[0-9a-zA-Zㄱ-ㅎ가-힣]*$/) == null) {
        throw Error('닉네임은 한글, 영문, 숫자만 입력 가능합니다.');
      }

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
    } else {
      Swal.fire({
        icon: 'success',
        title: '프로필 업데이트 성공',
        text: '프로필이 업데이트 되었습니다.',
      });
    }
<<<<<<< HEAD
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getUserInfo(_id: string): Promise<ProfileData | null> {
  if (!_id ?? _id === '') {
    return null;
  }
=======
    const data = await response.json(); 

    sessionStorage.setItem('nickname',data.nickname);
    window.location.reload();
  } catch (error) {
    console.error('프로필 업데이트 실패: ', error);
  }
}


export async function getUserInfo(_id: string): Promise<any> {
>>>>>>> 8cc6d23070fac1c221146114dee476cd009249e1
  const response = await fetch(`${API_URL}/users/${_id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function updateUserPassword(oldPassword: string, newPassword: string): Promise<void> {
  const formData = new FormData();
  formData.set('oldPassword', oldPassword);
  formData.set('newPassword', newPassword);

  const token = sessionStorage.getItem('token');
  console.log('token: ', token);
  try {
    await fetch(`${API_URL}/auth/password`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log(response.body);
        } else {
          throw new Error('비밀번호 업데이트 실패');
        }
      })
      .then(() => {
        console.log('비밀번호 업데이트 성공');
      });
  } catch (error) {
    console.error('비밀번호 업데이트 실패: ', error);
  }
}

export async function updateUserEmail(email: string): Promise<void> {
  const formData = new FormData();
  formData.set('email', email);

  const token = sessionStorage.getItem('token');

  try {
    await fetch(`${API_URL}/users`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then(() => {
        console.log('이메일 업데이트 성공');
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

    console.log('프로필 업데이트 성공');
  } catch (error) {
    console.error('프로필 업데이트 실패: ', error);
  }
}

export async function getUserInfo(_id: string): Promise<any> {
  const response = await fetch(`${API_URL}/users/${_id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    console.log('response: ', response);
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
}

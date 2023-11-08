import fetch from 'node-fetch';

export const logoutFormHandler = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  } catch (err) {
    console.log(err);
    alert('An error occurred while logging out.');
  }
};

document.querySelector('#logout')!.addEventListener('click', logoutFormHandler);

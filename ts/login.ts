export const loginFormHandler = async (event: Event) => {
  event.preventDefault();

  const username = (document.querySelector('#username-login') as HTMLInputElement).value.trim();
  const password = (document.querySelector('#password-login') as HTMLInputElement).value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

export const signupFormHandler = async (event: Event) => {
  event.preventDefault();

  const username = (document.querySelector('#username-signup') as HTMLInputElement).value.trim();
  const password = (document.querySelector('#password-signup') as HTMLInputElement).value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);


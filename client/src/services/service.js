const baseUrl = `http://localhost:6400/api`;

export const login = async (data) => {
  let res = await fetch(`${baseUrl}/user/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

export const register = async (data) => {
  let res = await fetch(`${baseUrl}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

export const getSchools = async () => {
  let res = await fetch(`${baseUrl}/school`);
  res = await res.json();
  return res;
};

export const addSchool = async (token, data) => {
  let res = await fetch(`${baseUrl}/school`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(data),
  });

  return res;
};

export const updateSchool = async (token, data, id) => {
  let res = await fetch(`${baseUrl}/school/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(data),
  });

  return res;
};

export const deleteSchool = async (token, schoolId) => {
  let res = await fetch(`${baseUrl}/school/${schoolId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });

  return res;
};

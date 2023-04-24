export const getAllRecommendationsService = async () => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND}/recommendations`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
  return json.data.recommendations;
};

export const getSingleRecommendationsService = async (id) => {
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND}/recommendations/${id}`
  );
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const userRegisterService = async (data) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
    method: "POST",

    body: data,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
};

export const userLoginService = async ({ email, password }) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
  return json.data.token;
};

export const getUserDataService = async ({ token }) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message);
  }
  return json.user;
};

/* Envia los cambios de editUser */
export const putUserDataInfoService = async (token, data) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const sendRecommendationService = async ({ token, data }) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND}/recommendations`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: token,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
  return json.data.recommendation;
};

export const deleteRecommendationService = async ({ id, token }) => {
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND}/recommendations/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
};

/* Comentario  */
export const sendCommentService = async ({ id, token, comentario }) => {
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND}/comments/${id}/comment`,
    {
      method: "POST",
      body: JSON.stringify({ comment: comentario }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const sendVoteService = async ({ id, token, vote }) => {
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND}/recommendations/${id}/vote`,
    {
      method: "POST",
      body: JSON.stringify({ vote: vote }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

/* Obtener datos del user */
export const getUserProfileService = async (idUser) => {
  console.log(idUser);
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND}/users/${idUser}`,
    {}
  );
  const json = await res.json();
  console.log(json);
  if (!res.ok) {
    throw new Error(json.message);
  }
  return json.users;
};

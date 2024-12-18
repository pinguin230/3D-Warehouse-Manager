import { fetchBaseQuery, BaseQueryApi, FetchArgs, FetchBaseQueryError, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { auth } from "../firebase.tsx"; // Імпорт аутентифікації Firebase

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3001" });

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
  console.log('BaseQueryWithReauth called with args:', args);

  const user = auth.currentUser;
  console.log('Current user baseQuery:', user);
  const token = await auth.currentUser?.getIdToken();
  console.log("Test token baseQuery:", token);

  if (user) {
    const token = await user.getIdToken();
    console.log('Token:', token);

    if (token) {
      if (typeof args === 'string') {
        args = { url: args, headers: {} };
      }
      args.headers = {
        ...(args.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    }
  } else {
    console.log('No user found');
  }

  const result = await baseQuery(args, api, extraOptions);

  return result;
};

export default baseQueryWithReauth;

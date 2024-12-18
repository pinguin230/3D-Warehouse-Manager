import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IContainer} from "../store/redusers/container/container.state.ts";

interface addFavoriteContainerProps {
  container: IContainer;
  userId: string
}

export const favoriteContainerAPI = createApi({
  reducerPath: "favoriteContainerAPI",
  baseQuery: fetchBaseQuery({baseUrl : "http://localhost:3001"}),
  tagTypes: ['FavoriteContainer'],
  endpoints: (build) => ({
    fetchAllFavoriteContainer: build.query<IContainer[], string>({
      query: (userId) => ({
        url: `/favorite-container?userId=${userId}`,
      }),
      providesTags: result => ["FavoriteContainer"]
    }),
    addFavoriteContainer: build.mutation<IContainer, addFavoriteContainerProps>({
      query: ({container, userId}) => ({
        url: "/favorite-container",
        method: "POST",
        body: {...container, userId}
      }),
      invalidatesTags: ["FavoriteContainer"]
    }),
    deleteFavoriteContainer: build.mutation<IContainer, IContainer>({
      query: (container) => ({
        url: `/favorite-container/${container._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FavoriteContainer"]
    }),
  })
})
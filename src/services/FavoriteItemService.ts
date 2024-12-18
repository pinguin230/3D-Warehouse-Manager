import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IItem} from "../store/redusers/item/item.state.ts";

interface addFavoriteItemProps{
  item: IItem
  userId: string
}

export const favoriteItemAPI = createApi({
  reducerPath: "favoriteItemAPI",
  baseQuery: fetchBaseQuery({baseUrl : "http://localhost:3001"}),
  tagTypes: ['FavoriteItem'],
  endpoints: (build) => ({
    fetchAllFavoriteItem: build.query<IItem[], string>({
      query: (userId) => ({
        url: `/favorite-item?userId=${userId}`,
      }),
      providesTags: result => ["FavoriteItem"]
    }),
    addFavoriteItem: build.mutation<IItem, addFavoriteItemProps>({
      query: ({item, userId}) => ({
        url: "/favorite-item",
        method: "POST",
        body: {...item, userId}
      }),
      invalidatesTags: ["FavoriteItem"]
    }),
    deleteFavoriteItem: build.mutation<IItem, IItem>({
      query: (item) => ({
        url: `/favorite-item/${item._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FavoriteItem"]
    }),
  })
})
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IItem} from "../store/redusers/item/item.state.ts";
import {IContainer} from "../store/redusers/container/container.state.ts";

interface addItemProps{
  item:IItem;
  userId: string
}

export const itemAPI = createApi({
  reducerPath: "itemAPI",
  baseQuery: fetchBaseQuery({baseUrl : "http://localhost:3001"}),
  tagTypes: ['Item'],
  endpoints: (build) => ({
    fetchAllItems: build.query<IItem[], string> ({
      query: (userId) => ({
        url: `/item?userId=${userId}`,
      }),
      providesTags: result => ["Item"]
    }),
    addItem: build.mutation<IItem, addItemProps>({
      query: ({item, userId}) => ({
        url: "/item",
        method: "POST",
        body: {...item, userId}
      }),
      invalidatesTags: ["Item"]
    }),
    deleteItem: build.mutation<IItem, IItem>({
      query: (item) => ({
        url: `/item/${item._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"]
    }),
    patchItem: build.mutation<IItem, IItem>({
      query: (item) => ({
        url: `/item/${item._id}`,
        method: "PATCH",
        body: item
      }),
      invalidatesTags: ["Item"]
    }),
    putItem: build.mutation<IItem, IItem>({
      query: (item) => ({
        url: `/item/${item._id}`,
        method: "PUT",
        body: item
      }),
      invalidatesTags: ["Item"]
    })

  })
})
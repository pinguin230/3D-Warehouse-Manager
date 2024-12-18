import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IContainer} from "../store/redusers/container/container.state.ts";

interface addContainerProps{
  container: IContainer;
  userId: string;
}

export const containerAPI = createApi({
  reducerPath: "containerAPI",
  baseQuery: fetchBaseQuery({baseUrl : "http://localhost:3001"}),
  tagTypes: ['Container'],
  endpoints: (build) => ({
    fetchAllContainer: build.query<IContainer[], string>({
      query: (userId) => ({
        url: `/container?userId=${userId}`,
      }),
      providesTags: result => ["Container"]
    }),
    addContainer: build.mutation<IContainer, addContainerProps>({
      query: ({container, userId}) => ({
        url: "/container",
        method: "POST",
        body: {...container, userId}
      }),
      invalidatesTags: ["Container"]
    }),
    deleteContainer: build.mutation<IContainer, IContainer>({
      query: (container) => ({
        url: `/container/${container._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Container"]
    }),
    patchContainer: build.mutation<IContainer, IContainer>({
      query: (container) => ({
        url: `/container/${container._id}`,
        method: "PATCH",
        body: container
      }),
      invalidatesTags: ["Container"]
    })
  })
})
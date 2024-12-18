import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IReport} from "../../server/controllers/report.controller.ts";

export const reportAPI = createApi({
  reducerPath: "reportAPI",
  baseQuery: fetchBaseQuery({baseUrl : "http://localhost:3001"}),
  tagTypes: ['Report'],
  endpoints: (build) => ({
    fetchAllReport: build.query<IReport[], void>({
      query: () => ({
        url: `/reports`,
      }),
      providesTags: result => ["Report"]
    }),
    fetchReportByID: build.query<IReport, string>({
      query: (_id) => ({
        url: `/reports/${_id}`,
        method: "GET",
      }),
    }),
    addReport: build.mutation<IReport, IReport>({
      query: (report) => ({
        url: "/reports",
        method: "POST",
        body: report
      }),
      invalidatesTags: ["Report"]
    }),
    deleteReport: build.mutation<IReport, string>({
      query: (id) => ({
        url: `/reports/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Report"]
    }),
    // patchReport: build.mutation<IReport, IReport>({
    //   query: (report) => ({
    //     url: `/report/${report._id}`,
    //     method: "PATCH",
    //     body: report
    //   }),
    //   invalidatesTags: ["Report"]
    // })
  })
})
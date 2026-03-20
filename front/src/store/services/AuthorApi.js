import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authorApi = createApi({
    reducerPath: 'author',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_URL}),
    tagTypes: ['authors'],
    endpoints: (build) => ({
        getAuthors: build.query({
            query: () => ({
                url: 'author',
                method: 'GET'
            }),
            providesTags: ['authors']
        }),
        createAuthor: build.mutation({
            query: (author) => ({
                url: 'author',
                method: 'POST',
                body: author
            }),
            invalidatesTags: ['authors']
        })
    })
})

export const { useGetAuthorsQuery, useCreateAuthorMutation } = authorApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '../../env'

export const bookApi = createApi({
    reducerPath: 'book',
    baseQuery: fetchBaseQuery({baseUrl: env.apiBaseUrl}),
    tagTypes: ['books'],
    endpoints: (build) => ({
        getBooks: build.query({
            query: ({page = 1, pageSize = 15}) => ({
                url: 'book',
                method: 'GET',
                params: {page, pageSize}
            }),
            providesTags: ['books']
        }),
        createBook: build.mutation({
            query: (bookData) => ({
                url: 'book',
                method: 'POST',
                body: bookData
            }),
            invalidatesTags: ['books']
        })
    })
})

export const { useGetBooksQuery, useCreateBookMutation } = bookApi
import { apiSlice } from "../api/apiSlice";

export const usersAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get User By Email
        getUser: builder.query({
            query: (email) => `/users?email=${email}`
        }),

        getUsers: builder.query({
            query: () => '/users'
        }),
    })
})


export const { useGetUserQuery, useGetUsersQuery } = usersAPI


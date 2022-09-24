import { apiSlice } from "../api/apiSlice";

// teams API endpoints for adding teams
export const teamsAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get ALL team
        getTeams: builder.query({
           query: () => '/teams',
        }),
        getTeam: builder.query({
            query: (id) => `/teams/${id}`,
         }),
        // Add a team
        addTeam: builder.mutation({
            query: (data) => ({
                url: '/teams',
                method: 'POST',
                body: data
            }),
            
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    
                    const { data: updatedTeam } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData('getTeams', undefined, (draft) => {
                            draft?.push(updatedTeam)
                        })
                    )
                    
                } catch (error) {
                    console.log('error in catch block');
                }
            }
            
        }),

        addMemberInTeam: builder.mutation({
            query: ({id, member, members}) => ({
                url: `/teams/${id}`,
                method: 'PATCH',
                body: {
                    members
                }
            }),
            
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    
                    await queryFulfilled;
                    console.log(arg)

                    dispatch(
                        apiSlice.util.updateQueryData('getTeams', arg?.member, (draft) => {
                            console.log(arg);
                            const team = draft?.find((team) => team.id == arg?.id)
                            team.members = arg?.members;
                        })
                    )
                    
                } catch (error) {
                    console.log('error in catch block');
                }
            }
            
        }),
        // Delete a Team by ID
        deleteTeam: builder.mutation({
            query: ({id, admin}) => ({
                url: `/teams/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    
                  await queryFulfilled;
                
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getTeams',
                             undefined,
                            (draft) => {
                                return draft.filter(
                                    (team) => team?.id !== arg?.id
                                );
                            }
                        )
                    );
                    
                } catch (error) {
                    console.log('error in catch block');
                }
            }
        }),
    })
})


export const { useGetTeamsQuery, useAddTeamMutation, useDeleteTeamMutation, useGetTeamQuery, useAddMemberInTeamMutation} = teamsAPI;


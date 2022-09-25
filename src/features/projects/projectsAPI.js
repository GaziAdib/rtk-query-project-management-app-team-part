import { apiSlice } from "../api/apiSlice";

// teams API endpoints for adding teams
export const projectsAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get ALL projects
        getProjects: builder.query({
           query: () => '/projects',
        }),
        getProject: builder.query({
            query: (id) => `/projects/${id}`,
         }),
        // Add a Project
        addProject: builder.mutation({
            query: (data) => ({
                url: '/projects',
                method: 'POST',
                body: data
            }),
            
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    
                    const { data: updatedProject } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData('getProjects', undefined, (draft) => {
                            draft?.push(updatedProject)
                        })
                    )
                    
                } catch (error) {
                    console.log('error in catch block');
                }
            }
            
        }),
        // Delete a project by ID
        deleteProject: builder.mutation({
            query: ({id, author}) => ({
                url: `/projects/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    
                  await queryFulfilled;
                
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getProjects',
                            undefined,
                            (draft) => {
                                return draft.filter(
                                    (project) => project?.id !== arg?.id
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

export const { useAddProjectMutation, useGetProjectsQuery, useDeleteProjectMutation  } = projectsAPI

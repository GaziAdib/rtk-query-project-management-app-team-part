import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    search: '',
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        searchProject: (state, action) => {
            state.search = action.payload;
        }
    }
});


export const { searchProject } = projectsSlice.actions;
export default projectsSlice.reducer;
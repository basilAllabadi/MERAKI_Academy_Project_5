import { createSlice } from "@reduxjs/toolkit";
const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    allUsers: [],
    favUsers: [],
    companyJobs: [],
    companyDetails: JSON.parse(localStorage.getItem("companyDetails")) || null,
    jobDetails: {},
    userDetailsInCompanyApp: {},
    relativeUsers: [],
    companyAppliedJobs: [],
  },
  reducers: {
    allUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setFavUsers: (state, action) => {
      state.favUsers = action.payload;
    },
    addToFavUsers: (state, action) => {
      state.favUsers.push(action.payload);
    },
    deleteFavUsers: (state, action) => {
      state.favUsers = state.favUsers.filter((elem, index) => {
        return elem.id != action.payload;
      });
    },
    setCompanyJobs: (state, action) => {
      state.companyJobs = action.payload;
    },
    addJob: (state, action) => {
      state.companyJobs.push(action.payload);
    },
    updateJob :(state,action)=>{
      state.companyJobs.map((elem, index) => {
        if (elem.id == action.payload.jobUpdateId) {
          state.companyJobs.splice(index,1,action.payload.updatedJob);
        }
      });
    
    },
    deleteJobs: (state, action) => {
      state.companyJobs = state.companyJobs.filter((elem, index) => {
        return elem.id != action.payload;
      });
    },
    setJobDetails: (state, action) => {
      state.jobDetails = action.payload;
    },
    setCompanyDetails: (state, action) => {
      state.companyDetails = action.payload;
      localStorage.setItem("companyDetails", JSON.stringify(state.companyDetails))
    },
    setCompanyAppliedJobs: (state, action) => {
      state.companyAppliedJobs = action.payload;
    },
    setuserDetailsInCompanyApp: (state, action) => {
      state.userDetailsInCompanyApp = action.payload;
    },
    setRelativeUsers: (state, action) => {
      state.relativeUsers = action.payload;
    },
  },
});

export const {
  allUsers,
  setFavUsers,
  addToFavUsers,
  deleteFavUsers,
  setCompanyJobs,
  addJob,
  deleteJobs,
  setJobDetails,
  setCompanyDetails,
  setRelativeUsers,
  setuserDetailsInCompanyApp,
  setCompanyAppliedJobs,updateJob
} = companiesSlice.actions;
export default companiesSlice.reducer;

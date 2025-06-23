import {toast} from "react-hot-toast"
import { create } from "zustand";
import axios from "axios";

// const URL = "http://localhost:3000";
const URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "";

export const useNotes = create((set,get)=>({
  
  initNotes:[],
  loading:false,
  error:null,
  currenNote:null,

  fetchNotes: async()=>{
    set({loading:true});
    try {
      const response = await axios.get(`${URL}/api/notebook`);
      set({ initNotes: response.data, error: null });
    } catch (err) {
      if (err){
        set({ error: "Something went wrong!" });
      } 
    } finally{
      set({loading:false});
    }
  },

  deteleNotes: async(id)=>{
    set({ loading: true });
    try {
      await axios.delete(`${URL}/api/notebook/${id}`);
      set((prev) => ({
        initNotes: prev.initNotes.filter((note) => note.id !== id),
      }));
      toast.success("Successfully deleted!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  userData:{
    title: "",
    notes: "",
    created_by: ""
  },

  setUserData: (userData) => set ({userData}),
  resetUserData: ()=>set({ userData:{title: "", notes: "", created_by: ""}}),
  

  addNotes: async(e)=>{
    e.preventDefault();
    set({ loading: true });
    try {
      const { userData } = get();
      await axios.post(`${URL}/api/notebook`, userData);
      await get().fetchNotes();
      get().resetUserData();
      toast.success("Successfully added!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchNote: async(id)=>{
    set({loading:true})
    try {
      const response = await axios.get(`${URL}/api/notebook/${id}`);
      set({ currenNote: response.data,
        userData: response.data,
      error:null }); //Set the existing values to the inputs
    } catch (err) {
      console.log(err);
      set({ error :"Something went wrong",currenNote:null});
    }finally{
      set({ loading: false });
    }
  },


  editNote: async(id)=>{
    set({ loading: true });
    try {
      const { userData } = get();
      const response = await axios.put(`${URL}/api/notebook/${id}`, userData);
      set({ currenNote: response.data });
      toast.success("Successfully edited!");
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      set({ loading: false });
    }
  }

}))

 


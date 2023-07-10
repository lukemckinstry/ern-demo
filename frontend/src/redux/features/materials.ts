import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Material } from '../models';
import API from '../api';

interface MaterialsState {
  materials: Material[];
  selectedMaterial: Material | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MaterialsState = {
  materials: [],
  selectedMaterial: null,
  status: 'idle',
  error: null
};

export const fetchMaterials = createAsyncThunk(
  'materials/fetchMaterials',
  async () => {
    const response = await API.get('materials/');
    return response.data;
  }
);

export const createMaterial = createAsyncThunk(
  'materials/createMaterial',
  async (args: { material: Material }) => {
    const { material } = args;
    const response = await API.post(`materials/`, material);
    return response.data;
  }
);

export const updateMaterial = createAsyncThunk(
  'materials/updateMaterial',
  async (args: { material: Material; changes: Partial<Material> }) => {
    const { material, changes } = args;
    const obj = {
      ...material,
      ...changes
    };
    const response = await API.put(`materials/`, obj);
    return response.data;
  }
);

export const deleteMaterial = createAsyncThunk(
  'materials/deleteMaterial',
  async (args: { material: Material }) => {
    const { material } = args;
    const response = await API.delete(`materials/${material.id}`);
    return response.data;
  }
);

export const materialsSlice = createSlice({
  name: 'materials',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    idleMaterials: (state) => {
      state.status = 'idle';
    },
    selectMaterial(state, action: PayloadAction<Material | null>) {
      state.selectedMaterial = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMaterials.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.materials = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateMaterial.pending, (state, action) => {
        const { material, changes } = action.meta.arg;
        const idx = state.materials.findIndex((r) => r.id === material.id);
        const updatedMaterial = {
          ...material,
          ...changes
        };
        state.materials = [
          ...state.materials.slice(0, idx),
          updatedMaterial,
          ...state.materials.slice(idx + 1)
        ];
      })
      .addCase(updateMaterial.rejected, (state, action) => {
        const { material } = action.meta.arg;
        const idx = state.materials.findIndex((r) => r.id === material.id);
        state.materials = [
          ...state.materials.slice(0, idx),
          ...state.materials.slice(idx + 1)
        ];
      })
      .addCase(createMaterial.pending, (state, action) => {
        const { material } = action.meta.arg;
        state.materials = [...state.materials, material];
      })
      .addCase(createMaterial.fulfilled, (state, action) => {
        const idx = state.materials.findIndex((r) => r.id === undefined);
        state.materials = [
          ...state.materials.slice(0, idx),
          action.payload,
          ...state.materials.slice(idx + 1)
        ];
      })
      .addCase(createMaterial.rejected, (state, action) => {
        const { material } = action.meta.arg;
        const idx = state.materials.findIndex((r) => r.id === material.id);
        state.materials = [
          ...state.materials.slice(0, idx),
          ...state.materials.slice(idx + 1)
        ];
      })
      .addCase(deleteMaterial.pending, (state, action) => {
        const { material } = action.meta.arg;
        const idx = state.materials.findIndex((r) => r.id === material.id);
        state.materials = [
          ...state.materials.slice(0, idx),
          ...state.materials.slice(idx + 1)
        ];
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        const { material } = action.meta.arg;
        state.materials = [...state.materials, material];
      });
  }
});

// Other code such as selectors can use the imported `RootState` type
export const selectMaterials = (state: RootState) => state.materials.materials;

export const { idleMaterials, selectMaterial } = materialsSlice.actions;

export default materialsSlice.reducer;

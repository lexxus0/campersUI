import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../tools/tools";
import { Camper, filterParams } from "../../interfaces/interfaces";

export const instance = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/",
});

export const fetchCampers = createAsyncThunk<
  { campers: Camper[]; totalItems: number; totalPages: number },
  { filters?: filterParams; page: number; limit: number },
  { rejectValue: string }
>("campers/getAll", async ({ filters, page, limit }, ThunkAPI) => {
  try {
    const params: Record<string, string> = {};

    if (filters) {
      if (filters.location) params.location = filters.location;
      if (filters.equipment) {
        filters.equipment.forEach((item) => {
          if (item === "TV" || item === "AC") {
            params[item] = "true";
          } else {
            params[item.toLowerCase()] = "true";
          }
        });
      }
      if (filters.form) params.form = filters.form;
    }

    params.page = String(page);
    params.limit = String(limit);

    const query = new URLSearchParams(params).toString();

    const { data } = await instance.get(`/campers?${query}`);

    const totalItems = data.total || 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { campers: data.items, totalItems, totalPages };
  } catch (e) {
    return ThunkAPI.rejectWithValue(handleError(e, "Failed to fetch campers"));
  }
});

export const fetchCamperById = createAsyncThunk<
  Camper,
  string,
  { rejectValue: string }
>("campers/getById", async (id: string, ThunkAPI) => {
  try {
    const { data } = await instance.get(`/campers/${id}`);
    return data;
  } catch (e) {
    return ThunkAPI.rejectWithValue(
      handleError(e, "Failed to fetch camper by id")
    );
  }
});

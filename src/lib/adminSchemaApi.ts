import axios from "axios";
import dataApi from "./dataApi";
import { addAuthHeader, makeResponseInterceptor } from "./api";

export interface SchemaField {
  name: string;
  type: string;
  label: string;
  read_only: boolean;
  required: boolean;
  nullable?: boolean;
  max_length?: number;
  min_value?: number;
  max_value?: number;
  choices?: Array<{ value: string; label: string }>;
  multiple?: boolean;
  related_model?: string;
  related_endpoint?: string;
  related_model_qualified_name?: string;
  show_in_list: boolean;
  sortable?: boolean;
  searchable?: boolean;
}

export interface ResourceSchema {
  name: string;
  label: string;
  endpoint: string;
  list_display: string[];
  search_fields: string[];
  ordering: string[];
  fields: SchemaField[];
  use_explicit_viewset?: boolean;
}

export interface SchemaListingItem {
  name: string;
  endpoint: string;
  label: string;
  url: string;
}

const schemaApi = axios.create({
  baseURL: "/api/schema",
  headers: { "Content-Type": "application/json" },
});

schemaApi.interceptors.request.use(addAuthHeader);
schemaApi.interceptors.response.use((r) => r, makeResponseInterceptor(schemaApi));

export const getSchemaListing = async (): Promise<SchemaListingItem[]> => {
  const { data } = await schemaApi.get("/");
  return data.schemas ?? [];
};

export const getResourceSchema = async (modelName: string): Promise<ResourceSchema> => {
  const { data } = await schemaApi.get(`/${modelName}/`);
  return data;
};

export const getResourceApi = (endpoint: string) => {
  const api = endpoint.startsWith("/data/") ? dataApi : axios.create({
    baseURL: "",
    headers: { "Content-Type": "application/json" },
  });

  // dataApi already has the interceptors; dynamic /api endpoints need them here.
  if (api !== dataApi) {
    api.interceptors.request.use(addAuthHeader);
    api.interceptors.response.use((r) => r, makeResponseInterceptor(api));
  }
  return api;
};

export const normalizeRows = (data: any): any[] =>
  Array.isArray(data) ? data : data?.results ?? [];

export const rowId = (row: any) => row?.id ?? row?.pk;

export const getResourcePath = (endpoint: string) => endpoint.startsWith("/data/") ? endpoint.replace(/^\/data/, "") : endpoint;

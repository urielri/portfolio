import axios, { AxiosResponse } from "axios";
import {
  _Media,
  _Project,
  _Resource,
  _Dates,
  Response,
  _Handler,
  _Slugs,
} from "interface";
const API = "http://localhost:8000";
const instance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});

instance.interceptors.response.use((config: AxiosResponse) => {
  const data = config.data;
  return data;
});

export async function get<T>(
  url: string,
  typename: string
): Promise<Response<T>> {
  try {
    const q: Response<any> = await instance.get(url);
    const res = await handler<T>(q.status, q.code, q.data, typename);
    return res;
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export async function post<T, J>(
  url: string,
  typename: string,
  body: J
): Promise<Response<T>> {
  try {
    const q: Response<any> = await instance.post(url, body);
    const res = await handler<T>(q.status, q.code, q.data, typename);
    return res;
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export async function patch<T, J>(
  url: string,
  typename: string,
  body: J
): Promise<Response<T>> {
  try {
    const q: Response<any> = await instance.patch(url, body);
    const res = await handler<T>(q.status, q.code, q.data, typename);
    return res;
  } catch (err: any) {
    Promise.reject(err);
    const res = await handler<T>("error", 0, {}, typename);
    return res;
  }
}
export async function remove<T>(
  url: string,
  typename: string
): Promise<Response<T>> {
  try {
    const q: Response<any> = await instance.delete(url);
    const res = await handler<T>(q.status, q.code, q.data, typename);
    return res;
  } catch (err: any) {
    Promise.reject(err);
    const res = await handler<T>("error", 0, {}, typename);
    return res;
  }
}
export async function getProject(slug: string): Promise<Response<_Project>> {
  try {
    const q: Response<any> = await instance.get(`/project/${slug}`);
    const res = await handler<_Project>(q.status, q.code, q.data, "project");
    return res;
  } catch (err: any) {
    return Promise.reject();
  }
}

export async function getProjects(): Promise<Response<_Project[]>> {
  try {
    const q: Response<any> = await instance.get(`/projects`);
    const res = await handler<_Project[]>(q.status, q.code, q.data, "project");
    return res;
  } catch (err: any) {
    return Promise.reject();
  }
}
export async function slugs(): Promise<Response<_Project["slug"][]>> {
  try {
    const q: Response<any> = await instance.get(`/projects/slugs`);
    const res = await handler<_Project["slug"][]>(
      q.status,
      q.code,
      q.data,
      "slugs"
    );
    return res;
  } catch (err: any) {
    return Promise.reject();
  }
}
export async function resources(): Promise<Response<_Resource[]>> {
  try {
    const q: Response<any> = await instance.get(`/resources`);
    const res = await handler<_Resource[]>(
      q.status,
      q.code,
      q.data,
      "resources"
    );
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
}
function adapter(data: any, typename: string): any {
  if (data && typename !== "") {
    if (Array.isArray(data)) {
      const result = [];
      for (let i = 0; i < data.length; i++) {
        const v = convert(typename, data[i]);
        result.push(v);
      }
      return result;
    } else {
      const result = convert(typename, data);
      return result;
    }
  } else {
    return false;
  }
}
async function handler<T>(
  status: string,
  code: number,
  data: any,
  typename: string
): Promise<Response<T>> {
  let loading = true;
  if (status === "ok" && status) {
    const adp = await adapter(data, typename);
    adp && (loading = false);
    return { data: adp, code: code, status: status, loading };
  } else {
    loading = false;
    return { data, code: 500, status: "error", loading };
  }
}

function convert(
  typename: string,
  data: any
): _Project | _Media | _Resource | _Dates | _Slugs | boolean {
  switch (typename) {
    case "project":
      const project: _Project = {
        _id: data.id || data._id.$oid || "",
        name: data.name || "",
        images: data.images || [],
        techs: data.techs || [],
        links: data.links || [],
        slug: data.slug || "",
        occupation: data.occupation || [],
        resources: data.resources || [],
        methodologies: data.methodologies || [],
        tools: data.tools || [],
        description: data.description || "",
        dates: data.dates || {
          from: "",
          to: "",
          isActive: false,
        },
      };
      return project;

      break;
    case "slugs":
      const res = { slug: data.slug || "" };
      return res;
      break;
    case "resources":
      const resource: _Resource = {
        icon: data.icon || {
          icon: "",
          link: "",
          alt: "",
        },
        name: data.name || "",
        link: data.link || "",
        _id: data.id || data._id.$oid || "",
      };
      return resource;
    default:
      return false;
  }
}

import axios, { AxiosResponse } from "axios";
import {
  _Media,
  _Project,
  _Resource,
  _Dates,
  Response,
  _Handler,
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

export async function getProject(slug: string): Promise<Response<_Handler>> {
  try {
    const q: Response<any> = await instance.get(`/project/${slug}`);
    const res = handler(q.status, q.code, q.data, "project");
    return res;
  } catch (err: any) {
    return Promise.reject();
  }
}

export async function getProjects(): Promise<Response<_Handler>> {
  try {
    const q: Response<any> = await instance.get(`/projects`);
    const res = handler(q.status, q.code, q.data, "project");
    return res;
  } catch (err: any) {
    return Promise.reject();
  }
}

function handler(
  status: string,
  code: number,
  data: any,
  typename: string
): Response<_Handler> {
  if (status === "ok") {
    const adp = adapter(data, typename);
    return { data: adp, code: code, status: status };
  } else {
    return { data: { result: null }, code: 500, status: "error" };
  }
}

function convert(
  typename: string,
  data: any
): _Project | _Media | _Resource | _Dates | boolean {
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
    default:
      return false;
  }
}

import type { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type _LayoutType<T> = NextPage<T> & {
  getLayout: (page: ReactElement) => ReactNode;

}
/*
export interface _Project {
  logo: string;
  name: string;
  occupation: string[];
  links: string[];
  techs: string[];
}
export interface _ProjectComplete extends _Project {
  description: string;
  occupationActive: boolean;
  dates: Date[] | string[];
  tools: string[];
  methodology: string[];
  resources: string[]
}
*/
export interface _Media {
  color: string;
  alt: string;
  link: string;
}
export interface _Slugs {
  slug: string;
}
 export interface _Resource {
  _id?: string;
  icon: _Media;
  link: string;
  name: string;
}
export interface _Dates {
  from: string | Date;
  to: string | Date;
  isActive: boolean;
}
export interface _Project {
  _id: string;
  name: string;
  images: _Media[];
  techs: _Resource[];
  links: string[];
  slug: string;
  occupation: string[];
  resources: _Resource[];
  methodologies: string[];
  tools: string[];
  description: string;
  dates: _Dates;
}
export type Response<T> = {
  data: T;
  code: number;
  status: string;
  loading: boolean;
};
export interface _Handler {
  result: any;
}
export interface _Props<T> {
fallback: T;
loading: boolean;
status: string;
slug?: string;
}
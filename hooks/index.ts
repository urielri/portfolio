import { useState, useEffect } from "react";
import { Response } from "interface";
import { patch, post, remove } from "service";
interface FormResult<T> {
  setValue: Function;
  resetValue: Function;
  message?: any;
  values: T | null;
  submit: boolean;
  setSubmit: Function;
}
export const useForm = <T>(form: T): FormResult<T> => {
  const [f, setF] = useState<T | null>(form);
  const [submit, setSubmit] = useState(false);
  const initialValue = { ...form };
  const setValue = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const aux: T | null | any = { ...f };
    aux[name] = value;
    setF(aux);
  };
  const resetValue = () => {
    setF(initialValue);
  };
  return { setValue, resetValue, values: f || null, submit, setSubmit };
};
type Form<J> = {
  submit: boolean;
  values: J;
};
export const useAggregate = <T, J>(
  form: Form<J>,
  name: string,
  url: string
): Response<T> => {
  const [r, setR] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function q() {
      const res = await post<T, any>(url, name, form.values);
      setR(res);
      setLoading(false);
    }
    if (form.submit) {
      !loading && setLoading(true);
      q();
    }
  }, [form.submit]);
  return { data: r.data || null, loading, code: r.code, status: r.status };
};

export const useModify = <J, T>(
  form: Form<J>,
  name: string,
  url: string
): Response<T> => {
  const [r, setR] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function q() {
      const res = await patch<T, any>(url, name, form.values);
      setR(res);
      setLoading(false);
    }
    if (form.submit) {
      !loading && setLoading(true);
      q();
    }
  }, [form.submit]);
  return { data: r.data || null, loading, code: r.code, status: r.status };
};
export const useDelete = <T>(
  name: string,
  url: string,
  submit: boolean
): Response<T> => {
  const [r, setR] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function q() {
      const res = await remove<T>(url, name);
      setR(res);
      setLoading(false);
    }
    if (submit) {
      !loading && setLoading(true);
      q();
    }
  }, [submit]);
  return { data: r.data || null, loading, code: r.code, status: r.status };
};
/*
interface R {
  code: number;
  loading: boolean;
  data: any;
}
export const useCurryForm =
  (form: FormResult) =>
   <T>(query: Function): any => {
    const res: T =  query(form);
    return { res };
  };

  const [result, setResult] = useState<R>({ code: 0, loading: true, data: null });
  useEffect(() => {
    console.log(query.data);
    if(!query.loading) {
        setResult({...result, data: 'eaaa'})
    }
  }, [query.loading]);
  return {
    result
  }
  */

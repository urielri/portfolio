import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { _Project } from "interface";
export const theme = atom<'os' | 'light' | 'dark'>({
  key: "themeState",
  default: "os",
});

export const project = atom<_Project | null>({
  key: "projectState",
  default: null
});
export const cardProject = selector({
  key: "cardProjectState",
  get: ({get}) => {
    const p = get(project);
    const card = {
      _id: p?._id || '',
      name: p?.name || '',
      slug: p?.slug || "",
      logo: p?.images[0] || {},
      occupation: p?.occupation || [],
      links: p?.links || [],
      techs: p?.techs.length || 0,
    }
    return card
  }
})
export const projects  = atom<_Project[] | []>({
  key: "projectsState",
  default: []
});

export const projectFamily = atomFamily<_Project | null, string>({
  key: "projectFamily",
  default: null
})
export const cardProjectFamily = selectorFamily({
  key: "cardProjectFamily",
  get: (id: string) => ({get}) => {
    const p = get(projectFamily(id));
      const card = {
      _id: p?._id || '',
      name: p?.name || '',
      slug: p?.slug || "",
      logo: p?.images[0] || {},
      occupation: p?.occupation || [],
      links: p?.links || [],
      techs: p?.techs.length || 0,
    }
    return card
  }
})
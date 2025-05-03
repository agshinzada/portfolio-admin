export interface ProjectData {
  id: number;
  title: string;
  description: string;
  link: string;
  repo: string;
  active: number;
  status: number;
  slug_url: string;
  images: ProjectImage[];
  sort: number;
  status_title: string;
  // tags: string[];
}

export interface ProjectImage {
  id: number;
  url: string;
  project_id: number;
  image_id: number;
  active: number;
  type: number;
}

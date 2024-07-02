export type StackData = {
  [key: string]: boolean;
} | null;

export type ProjectData = {
  id: string;
  name: string;
  sourceURL: string;
  previewURL: string | null;
  noPreviewURLComment: string | null;
  previewImage: string;
  centeredPreviewImage: boolean;
  type: 'pet' | 'test' | 'practice' | 'learning';
  status: 'active' | 'archive' | 'development';
  stack: StackData;
};

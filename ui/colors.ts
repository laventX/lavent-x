import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfigFile from '@/tailwind.config';

const tailwindConfig = resolveConfig(tailwindConfigFile);

export const colors = tailwindConfig.theme.colors as unknown as Record<
  string,
  string
>;

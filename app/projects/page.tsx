'use client';

import { Tooltip } from 'react-tooltip';

import json from '@/data/projects.json';

import { ProjectData } from '@/types/project';

import Projects from '@/components/projects/projects';

const projects = json as unknown as ProjectData[];

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Projects</h1>

      <Projects projects={projects} />

      <Tooltip
        className="!z-[9000] !bg-space-700 !transition-none !duration-0"
        anchorSelect=".tooltip"
        place="bottom"
        opacity={0.95}
        globalCloseEvents={{
          escape: true,
          scroll: true
        }}
        render={({ content }) => <div>{content}</div>}
      />
    </>
  );
}

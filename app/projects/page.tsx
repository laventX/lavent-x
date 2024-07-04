'use client';

import { Tooltip } from 'react-tooltip';

import projectsJson from '@/data/projects.json';

import { ProjectData } from '@/types';

import Projects from '@/components/projects/projects';

const projectsData = projectsJson as unknown as ProjectData[];

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Projects</h1>

      <Projects projects={projectsData} />

      <Tooltip
        className="!z-[9000] !rounded-xl !bg-space-700 !text-base !transition-none !duration-0"
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

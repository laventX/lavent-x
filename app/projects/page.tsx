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
        className="!z-[9000] !rounded-[16px] !bg-white/30 !text-base !backdrop-blur-[10px] !transition-none !duration-0 ![text-shadow:0_0_10px_rgba(28,21,39,0.4)] sm:!text-sm"
        anchorSelect=".tooltip"
        place="top"
        noArrow
        globalCloseEvents={{
          escape: true,
          scroll: true
        }}
        render={({ content }) => <div>{content}</div>}
      />
    </>
  );
}

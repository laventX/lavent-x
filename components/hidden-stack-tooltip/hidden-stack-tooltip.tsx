import { Tooltip } from 'react-tooltip';

import { SHOWN_STACK_SIZE } from '@/consts';
import { getDataAttribute, getProjectDataById } from '@/lib/utils';
import { getHiddenStack } from '@/model/stack';

import { CustomComponentProps, ProjectData, StackItem } from '@/types';

import SVGIcon from '@/components/svg-icon/svg-icon';

type HiddenStackTooltipProps = CustomComponentProps & {
  projects: ProjectData[];
};

export default function HiddenStackTooltip({
  projects
}: HiddenStackTooltipProps) {
  return (
    <Tooltip
      className="!z-[9000] !rounded-xl !bg-space-700 !p-[20px] !text-base !transition-none !duration-0"
      anchorSelect=".hidden-stack-button"
      globalCloseEvents={{
        escape: true,
        scroll: true
      }}
      clickable
      place="right"
      opacity={0.95}
      render={({ activeAnchor }) => {
        if (activeAnchor === null) return;

        const projectID = getDataAttribute(activeAnchor, 'project-id');

        const projectData = getProjectDataById(projects, projectID);

        if (!projectData) {
          return null;
        }

        const stackList = projectData.stackList;

        const hiddenStack = getHiddenStack(stackList, SHOWN_STACK_SIZE);

        if (!hiddenStack) {
          return null;
        }

        return (
          <ul className="flex flex-col space-y-[16px]">
            {hiddenStack.map((stackItem) => {
              return (
                <li
                  className="flex h-[32px] w-full flex-row items-center space-x-[12px]"
                  key={stackItem.name}
                >
                  {stackItem.link ? (
                    <a
                      className="flex h-full w-full flex-row items-center space-x-[12px] transition-colors hover:text-space-100 active:text-space-200"
                      href={stackItem.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <HiddenStackItem data={stackItem} />
                    </a>
                  ) : (
                    <>
                      <HiddenStackItem data={stackItem} />
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        );
      }}
    />
  );
}

type HiddenStackItemProps = CustomComponentProps & {
  data: StackItem;
};

function HiddenStackItem({ data }: HiddenStackItemProps) {
  return (
    <>
      <SVGIcon className="h-[32px] w-[32px]" icon={data.icon} />
      <span>{data.name}</span>
    </>
  );
}

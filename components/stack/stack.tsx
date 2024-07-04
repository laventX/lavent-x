import clsx from 'clsx';

import { SHOWN_STACK_SIZE } from '@/consts';
import { getShownStack } from '@/model/stack';

import {
  CustomComponentProps,
  IconsTheme,
  StackItem,
  StackList
} from '@/types';

import SVGIcon from '@/components/svg-icon/svg-icon';

type StackProps = CustomComponentProps & {
  projectID: string;
  stackList?: StackList;
  theme: IconsTheme;
};

export default function Stack({
  className,
  projectID,
  stackList,
  theme
}: StackProps) {
  if (!stackList) {
    return null;
  }

  const shownStack = getShownStack(stackList, SHOWN_STACK_SIZE);

  if (!shownStack) {
    return;
  }

  const hasHiddenStack = stackList.length > shownStack.length;

  return (
    <div
      className={clsx(
        className,
        'flex h-[32px] w-[272px] flex-row items-center justify-end space-x-[8px]'
      )}
    >
      {shownStack.length > 0 && (
        <ul className="flex flex-row items-center justify-end space-x-[8px]">
          {shownStack.map((stackItem) => {
            return (
              <li key={stackItem.name}>
                <ShownStackItem
                  className="h-[32px] w-[32px]"
                  data={stackItem}
                />
              </li>
            );
          })}
        </ul>
      )}
      {hasHiddenStack && (
        <HiddenStackButton
          className="h-[32px] w-[32px]"
          theme={theme}
          projectID={projectID}
        />
      )}
    </div>
  );
}

type ShownStackItemProps = CustomComponentProps & {
  data: StackItem;
};

function ShownStackItem({ className, data }: ShownStackItemProps) {
  return data.link ? (
    <a
      className={clsx(className, 'tooltip flex items-center justify-center')}
      href={data.link}
      target="_blank"
      rel="noreferrer"
      data-tooltip-content={data.name}
      data-tooltip-place="bottom"
    >
      <ShownStackItemIcon data={data} />
    </a>
  ) : (
    <div
      className={clsx(className, 'tooltip flex items-center justify-center')}
      tabIndex={0}
      data-tooltip-content={data.name}
      data-tooltip-place="bottom"
    >
      <ShownStackItemIcon data={data} />
    </div>
  );
}

type ShownStackItemIconProps = CustomComponentProps & {
  data: StackItem;
};

function ShownStackItemIcon({ data }: ShownStackItemIconProps) {
  return (
    <>
      <SVGIcon icon={data.icon} />
      <span className="sr-only">{data.name}</span>
    </>
  );
}

type HiddenStackProps = CustomComponentProps & {
  projectID: string;
  theme: IconsTheme;
};

function HiddenStackButton({ className, projectID, theme }: HiddenStackProps) {
  return (
    <div
      className={clsx(
        className,
        'hidden-stack-button flex items-center justify-center'
      )}
      tabIndex={0}
      data-project-id={projectID}
    >
      <SVGIcon className="w-[70%]" icon="more" theme={theme} />
    </div>
  );
}

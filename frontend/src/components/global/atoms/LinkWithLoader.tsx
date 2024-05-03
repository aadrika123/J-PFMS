import Link from "next/link";
import React, { FC, ReactNode } from "react";
import { useWorkingAnimation } from "../molecules/general/useWorkingAnimation";
import { usePathname } from "next/navigation";

interface LinkWithLoaderProps {
  children: ReactNode;
  className?: string;
  href: string;
}

export const LinkWithLoader: FC<LinkWithLoaderProps> = (props) => {
  const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();
  const pathname = usePathname();
  const onClick = () => {
    if (pathname !== props.href) {
      activateWorkingAnimation();
    }
  };

  return (
    <>
      {workingAnimation}
      <Link className={props.className} href={props.href} onClick={onClick}>
        {props.children}
      </Link>
    </>
  );
};

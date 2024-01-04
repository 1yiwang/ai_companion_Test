"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { HelpCircle } from "lucide-react";
import { ReactNode } from "react";
import { Drawer } from "vaul";
import useMediaQuery from "../hooks/use-media-query";

export function Tooltip({
  children,
  content,
  side = "top",
  desktopOnly,
  fullWidth,
}: {
  children: ReactNode;
  content: ReactNode | string;
  side?: "top" | "bottom" | "left" | "right";
  desktopOnly?: boolean;
  fullWidth?: boolean;
}) {
  const { isMobile } = useMediaQuery();

  if (isMobile && !desktopOnly) {
    return (
      <Drawer.Root>
        <Drawer.Trigger
          className={`${fullWidth ? "w-full" : "inline-flex"} md:hidden`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </Drawer.Trigger>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-secondary bg-opacity-10 backdrop-blur" />
        <Drawer.Portal>
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 rounded-t-[10px] border-t bg-background">
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="my-3 h-1 w-12 rounded-full bg-secondary" />
            </div>
            <div className="flex min-h-[150px] w-full items-center justify-center overflow-hidden bg-background align-middle shadow-xl">
              {typeof content === "string" ? (
                <span className="block text-center text-sm text-foreground">
                  {content}
                </span>
              ) : (
                content
              )}
            </div>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }
  return (
    <TooltipPrimitive.Provider delayDuration={100}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={8}
            side={side}
            className="animate-slide-up-fade z-[99] items-center overflow-hidden rounded-md border bg-background shadow-md md:block"
          >
            {typeof content === "string" ? (
              <div className="block max-w-xs px-4 py-2 text-center text-sm text-secondary-foreground">
                {content}
              </div>
            ) : (
              content
            )}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export function TooltipContent({ title }: { title: string }) {
  return (
    <div className="max-w-xs px-4 py-2 text-center text-sm text-secondary-foreground">
      {title}
    </div>
  );
}

export function InfoTooltip({ content }: { content: ReactNode | string }) {
  return (
    <Tooltip content={content}>
      <HelpCircle className="h-4 w-4 text-muted-foreground" />
    </Tooltip>
  );
}

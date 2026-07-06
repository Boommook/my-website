import { CSSProperties, ReactNode } from "react";

type RevealTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

export function RevealText({
  children,
  className = "",
  delay = 0,
  duration = 1.8,
}: RevealTextProps) {
  const vars = {
    "--delay": delay,
    "--duration": duration,
  } as CSSProperties;

  return (
    <div
      className={`reveal-text-block ${className}`.trim()}
      data-debug="false"
      style={vars}
    >
      <div className="text-container">
        <div className="text" aria-hidden="true">
          {children}
        </div>
        <div className="dupe dupe--hide" style={vars}>
          <div className="dupe__content" aria-hidden="true">
            {children}
          </div>
        </div>
        <div className="dupe dupe--reveal" style={vars}>
          <div className="dupe__content">{children}</div>
        </div>
      </div>
    </div>
  );
}

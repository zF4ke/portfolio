import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { type ReactNode, useId, useRef, useState } from "react";
import styles from "./ProjectsDisclosure.module.css";

export default function ProjectsDisclosure({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  function toggle() {
    if (expanded && contentRef.current?.contains(document.activeElement)) {
      triggerRef.current?.focus({ preventScroll: true });
    }
    setExpanded((value) => !value);
  }

  return (
    <div className={styles.root} data-expanded={expanded}>
      <div className={styles.action}>
        <button ref={triggerRef} type="button" onClick={toggle} aria-expanded={expanded} aria-controls={contentId} className={styles.trigger}>
          <span>{expanded ? "Show fewer projects" : "Show more projects"}</span>
          <ChevronDownIcon className={styles.chevron} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
      <div ref={(node) => {
        contentRef.current = node;
        if (node) node.inert = !expanded;
      }} id={contentId} className={styles.panel} aria-hidden={!expanded}>
        <div className={styles.clip}>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}

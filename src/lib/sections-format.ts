export interface Section {
  heading?: string;
  body: string[];
}

/** Parses the admin textarea's plain-text convention into structured
 * sections: blocks separated by a blank line, each optionally starting
 * with "## Heading" followed by one paragraph per line. */
export function parseSections(text: string): Section[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split("\n").map((l) => l.trim());
      if (lines[0]?.startsWith("## ")) {
        return { heading: lines[0].slice(3).trim(), body: lines.slice(1).filter(Boolean) };
      }
      return { body: lines.filter(Boolean) };
    });
}

/** Inverse of parseSections, for populating the edit form's textarea. */
export function serializeSections(sections: Section[]): string {
  return sections
    .map((s) => (s.heading ? `## ${s.heading}\n${s.body.join("\n")}` : s.body.join("\n")))
    .join("\n\n");
}

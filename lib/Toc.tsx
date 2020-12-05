import { Toc as TocType } from "lib/mdx"

export const Toc: React.FC<{ lang: string; toc: TocType[] }> = ({
  lang,
  toc,
}) => {
  return !toc || toc.length === 0 ? null : (
    <details open>
      <summary>{lang === "fr" ? "Table des matières" : "Summary"}</summary>
      <TocLevel tocs={toc} />
    </details>
  )
}

const TocLevel: React.FC<{ tocs: TocType[] }> = ({ tocs }) => {
  return tocs.length > 0 ? (
    <ul>
      {tocs.map(([{ title, slug }, children]) => (
        <li key={slug}>
          <a href={`#${slug}`}>{title}</a>
          <TocLevel tocs={children} />
        </li>
      ))}
    </ul>
  ) : null
}

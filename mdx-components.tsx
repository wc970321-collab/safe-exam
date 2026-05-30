import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="text-2xl font-bold mt-8 mb-4 text-gray-900" {...props} />
    ),
    h2: (props) => (
      <h2 className="text-xl font-semibold mt-8 mb-3 border-l-4 border-primary-500 pl-4 text-gray-900" {...props} />
    ),
    h3: (props) => (
      <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900" {...props} />
    ),
    p: (props) => <p className="mb-4 leading-loose text-gray-800" {...props} />,
    ul: (props) => <ul className="mb-4 pl-6 leading-loose list-disc" {...props} />,
    ol: (props) => <ol className="mb-4 pl-6 leading-loose list-decimal" {...props} />,
    li: (props) => <li className="mb-1" {...props} />,
    a: (props) => (
      <a
        className="text-primary-600 hover:text-primary-700 underline decoration-primary-300 hover:decoration-primary-500 transition-colors"
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      />
    ),
    table: (props) => (
      <div className="overflow-x-auto mb-4 rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    th: (props) => (
      <th className="bg-primary-50 text-left p-3 border-b border-gray-200 font-semibold text-primary-900 whitespace-nowrap" {...props} />
    ),
    td: (props) => (
      <td className="p-3 border-b border-gray-100" {...props} />
    ),
    blockquote: (props) => (
      <blockquote className="border-l-4 border-accent-400 bg-accent-50 px-4 py-3 mb-4 rounded-r-lg text-gray-700" {...props} />
    ),
    strong: (props) => <strong className="font-semibold text-gray-900" {...props} />,
    code: (props) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-primary-700 font-mono" {...props} />
    ),
    hr: (props) => <hr className="my-8 border-gray-200" {...props} />,
    img: (props) => (
      <img className="rounded-lg shadow-md my-4 max-w-full" loading="lazy" {...props} />
    ),
    ...components,
  };
}

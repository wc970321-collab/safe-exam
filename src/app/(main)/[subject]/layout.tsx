import { getChapters, getSubject } from "@/lib/subjects";
import { SUBJECTS } from "@/lib/constants";
import Sidebar from "@/components/layout/Sidebar";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

interface SubjectLayoutProps {
  children: React.ReactNode;
  params: { subject: string };
}

export async function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({
  params,
}: SubjectLayoutProps): Promise<Metadata> {
  const subject = getSubject(params.subject);
  if (!subject) return {};
  return buildMetadata({
    title: subject.title,
    description: subject.description,
    path: `/${params.subject}`,
  });
}

export default function SubjectLayout({
  children,
  params,
}: SubjectLayoutProps) {
  const subject = getSubject(params.subject);
  if (!subject) notFound();
  const chapters = getChapters(params.subject);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb
        items={[{ label: subject.title, href: `/${params.subject}` }]}
      />
      <div className="flex gap-10">
        <Sidebar subject={params.subject} chapters={chapters} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}

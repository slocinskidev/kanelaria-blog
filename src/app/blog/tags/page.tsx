import BackButton from "@/components/back";
import { Container, Prose, Section } from "@/components/craft";
import { getAllTags } from "@/lib/wordpress";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wszystkie tagi",
  description: "Przeglądaj wszystkie tagi naszych postów",
  alternates: {
    canonical: "/blog/tagi",
  },
};

export default async function Page() {
  const tags = await getAllTags();

  return (
    <Section>
      <Container className="space-y-6">
        <Prose className="mb-8">
          <h2>Wszystkie tagi</h2>
          <ul className="grid">
            {tags.map((tag: any) => (
              <li key={tag.id}>
                <Link href={`/blog/?tag=${tag.id}`}>{tag.name}</Link>
              </li>
            ))}
          </ul>
        </Prose>
        <BackButton />
      </Container>
    </Section>
  );
}

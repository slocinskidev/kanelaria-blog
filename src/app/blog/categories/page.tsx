import BackButton from "@/components/back";
import { Container, Prose, Section } from "@/components/craft";
import { getAllCategories } from "@/lib/wordpress";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wszystkie kategorie",
  description: "Przeglądaj wszystkie kategorie naszych postów",
  alternates: {
    canonical: "/blog/kategorie",
  },
};

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <Section>
      <Container className="space-y-6">
        <Prose className="mb-8">
          <h2>Wszystkie kategorie</h2>
          <ul className="grid">
            {categories.map((category: any) => (
              <li key={category.id}>
                <Link href={`/blog/?category=${category.id}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </Prose>
        <BackButton />
      </Container>
    </Section>
  );
}

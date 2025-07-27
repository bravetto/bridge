import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPerson, getAllPeople } from "@/data/people";
import { PersonData } from "@/types/person";
import { PersonPageClient } from "./client";

interface PersonPageParams {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PersonPage({ params }: PersonPageParams) {
  const { slug } = await params;
  const personData = getPerson(slug);

  if (!personData) {
    notFound();
  }

  return <PersonPageClient personData={personData} />;
}

export async function generateMetadata({
  params,
}: PersonPageParams): Promise<Metadata> {
  const { slug } = await params;
  const personData = getPerson(slug);

  if (!personData) {
    return {
      title: "Person Not Found",
    };
  }

  return {
    title: `${personData.name} | The Bridge Project`,
    description: personData.testimony?.quote || personData.title || `Learn about ${personData.name}`,
    openGraph: {
      title: `${personData.name} | The Bridge Project`,
      description: personData.testimony?.quote || personData.title || `Learn about ${personData.name}`,
      images: personData.heroImage ? [personData.heroImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const people = getAllPeople();
  return people.map((person) => ({
    slug: person.slug,
  }));
}

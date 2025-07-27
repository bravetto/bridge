import { Metadata } from "next";
import PeopleContent from "./people-content";

export const metadata: Metadata = {
  title: "Transformation Agents | The Bridge | The Bridge Project",
  description: "Meet the extraordinary individuals whose faith journeys are transforming lives and communities through The Bridge Project.",
  authors: [
    { name: "The Bridge Project Team" },
    { name: "JAHmere Webb", url: "/people/jahmere-webb" },
    { name: "Tony Dungy", url: "/people/tony-dungy" },
  ],
  keywords: [
    "JAHmere Webb",
    "criminal justice reform", 
    "community transformation",
    "second chances",
    "faith-based rehabilitation",
    "Tony Dungy",
    "Judge Ferrero",
    "Orange County justice",
    "community bridges",
    "positive change"
  ],
  creator: "The Bridge Project Team",
  publisher: "The Bridge Project",
  robots: "index, follow",
  category: "Social Impact",
  classification: "Community Organization",
};

// NON-ASYNC to bypass Next.js 15.4.2 loading.tsx bug
export default function PeopleIndexPage() {
  return <PeopleContent />;
} 
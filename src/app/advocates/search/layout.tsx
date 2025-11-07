import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solace Advocate Search",
  description: "Find the right advocate for you",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
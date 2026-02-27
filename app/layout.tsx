
import "./globals.css";
import Link from "next/link";
import { getTopics } from "@/lib/topics-store";

export const metadata ={
  title:"WEB",
  description:"practice"
}
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topics = await getTopics();

  return (
    <html lang="en">
      <body>
        <h1><Link href="/">WEB</Link></h1>
        <ol>
          {topics.map((topic) => (
            <li key={topic.id}>
              <Link href={`/read/${topic.id}`}>{topic.title}</Link>
            </li>
          ))}
        </ol>
        {children}
        <ul>
          <li><Link href="/create">Create</Link></li>
        </ul>
      </body>
    </html>
  );
}

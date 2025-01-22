import Landing from "./Landing/page";
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <main className="flex-grow">
        <Landing />
      </main>
    </div>
  );
}

import { type MetaFunction } from "react-router";

interface DebugPageProps {
  title: string;
  description: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Debug | wemake" },
    { name: "description", content: "Debugging page for Chrome DevTools" }
  ];
};

export function DebugPage({ title, description }: DebugPageProps) {
  return (
    <div className="px-20">
      <h1 className="text-5xl font-bold leading-tight tracking-tight">
        {title}
      </h1>
      <p className="text-xl font-light text-muted-foreground">
        {description}
      </p>
    </div>
  );
} 
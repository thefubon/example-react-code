import Link from "next/link";

const pages = [
  {
    name: "Multiple Category Filters",
    url: "/category",
  },
];

export default function Home() {
  return (
    <div className="grid gap-4">
      {pages.map((item, idx) => {
        return (
          <Link key={idx} href={item.url}>
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}

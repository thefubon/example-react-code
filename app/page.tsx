import Link from 'next/link'

const pages = [
  {
    name: 'Multi Filter',
    url: 'pages/multi-filter',
  },
  {
    name: 'Dropdown',
    url: 'pages/dropdown',
  },
]

export default function Home() {
  return (
    <div className="grid gap-4">
      {pages.map((item, idx) => {
        return (
          <Link
            key={idx}
            href={item.url}>
            {item.name}
          </Link>
        )
      })}
    </div>
  )
}

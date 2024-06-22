import Link from 'next/link'

const pages = [
  {
    name: 'Мульти фильтр',
    url: 'pages/multi-filter',
  },
]

export default function Home() {
  return (
    <div className="container p-12">
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
    </div>
  )
}

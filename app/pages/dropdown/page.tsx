import Dropdown from '@/components/Dropdown'

export default function PageDropdown() {
  return (
    <div className="container py-12">
      <Dropdown label="Options">
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          tabIndex={-1}
          id="menu-item-0">
          Option 1
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          tabIndex={-1}
          id="menu-item-1">
          Option 2
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          tabIndex={-1}
          id="menu-item-2">
          Option 3
        </a>
      </Dropdown>
    </div>
  )
}

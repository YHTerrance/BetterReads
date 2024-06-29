import Link from "next/link"
import { Input } from "@/components/ui/input"
import { StarIcon } from "./icons"

const Sidebar = () => {

  return (
    <div className="bg-background rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        <li>
          <Link href="#" className="hover:underline" prefetch={false}>
            Fiction
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline" prefetch={false}>
            Non-Fiction
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline" prefetch={false}>
            Mystery
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline" prefetch={false}>
            Romance
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline" prefetch={false}>
            Science Fiction
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline" prefetch={false}>
            Fantasy
          </Link>
        </li>
      </ul>
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Top Rated</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img src="/placeholder.svg" alt="Book Cover" width={64} height={96} className="rounded-md" />
            <div>
              <h3 className="text-base font-bold">The Great Gatsby</h3>
              <p className="text-muted-foreground text-sm">F. Scott Fitzgerald</p>
              <div className="flex items-center gap-1 text-yellow-500">
                <StarIcon className="w-4 h-4" />
                <StarIcon className="w-4 h-4" />
                <StarIcon className="w-4 h-4" />
                <StarIcon className="w-4 h-4" />
                <StarIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img src="/placeholder.svg" alt="Book Cover" width={64} height={96} className="rounded-md" />
            <div>
              <h3 className="text-base font-bold">To Kill a Mockingbird</h3>
              <p className="text-muted-foreground text-sm">Harper Lee</p>
              <div className="flex items-center gap-1 text-yellow-500">
                <StarIcon className="w-4 h-4" />
                <StarIcon className="w-4 h-4" />
                <StarIcon className="w-4 h-4" />
                <StarIcon className="w-4 h-4" />
                <StarIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Search</h2>
        <Input type="text" placeholder="Search for a book..." className="w-full" />
      </div>
    </div>
  )
}

export default Sidebar
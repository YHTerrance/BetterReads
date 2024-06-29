import Link from "next/link";

const Footer = () => {
    return (
      <footer className="bg-primary text-primary-foreground py-4 px-6 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm">&copy; 2023 Book Review. All rights reserved.</p>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    )
}

export default Footer;
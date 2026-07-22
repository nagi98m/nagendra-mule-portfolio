import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">404 / Not found</p><h1>This route is outside the system.</h1><p>The page may have moved or the address may be incorrect.</p><Link className="button button-primary" href="/">Return home</Link></main>;
}

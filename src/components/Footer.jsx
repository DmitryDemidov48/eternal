import Link from 'next/link'
import {Container} from "./Container";
import { motion } from "framer-motion";
import {useRouter} from "next/router";

function NavLink({ href, children }) {
    const router = useRouter();

    // Определим варианты анимации
    const variants = {
        active: { opacity: 1 },
        inactive: { opacity: 0.6 },
    };

    return (
        <Link href={href} passHref>

            <motion.div
                className="transition hover:text-teal-500 dark:hover:text-teal-400"
                variants={variants}
                initial="inactive"
                animate={router.pathname === href ? "active" : "inactive"}
                transition={{ duration: 0.2 }}
            >
                {children}
            </motion.div>
        </Link>
    );
}

export function Footer() {
  return (
      <footer className="mt-32">
        <Container.Outer>
          <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
            <Container.Inner>
              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  <NavLink href="/about">Инфо</NavLink>
                  <NavLink href="/courses">Курсы</NavLink>
                  <NavLink href="/seminars">Семинары</NavLink>
                  <NavLink href="/retreats">Ретрит</NavLink>
                </div>
                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                  &copy; {new Date().getFullYear()} Eternal Blue Yoga
                </p>
              </div>
            </Container.Inner>
          </div>
        </Container.Outer>
      </footer>
  )
}

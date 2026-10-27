
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaBars,
  FaTimes,
} from 'react-icons/fa'
import { FaBluesky } from 'react-icons/fa6'

import styles from './Header.module.css'

const navigation = [
  { label: 'News', href: '/news' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Releases', href: '/releases' },
  { label: 'Anticipated', href: '/anticipated' },
  { label: 'Lists', href: '/thelists' },
  { label: 'Columnists', href: '/columnists' },
  { label: 'Listening To', href: '/listening-to' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    Icon: FaInstagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    Icon: FaFacebookF,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/',
    Icon: FaYoutube,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/',
    Icon: FaTiktok,
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/',
    Icon: FaBluesky,
  },
]

function SocialLinks({ className = '' }) {
  return (
    <div className={`${styles.socials} ${className}`}>
      {socialLinks.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { asPath } = useRouter()
  const currentPath = asPath.split(/[?#]/)[0] // drop any query string or hash

  const isActive = (href) =>
    currentPath === href || currentPath.startsWith(`${href}/`)

  useEffect(() => {
      function handleScroll() {
        setIsScrolled(window.scrollY > 30)
      }

      handleScroll()

      window.addEventListener('scroll', handleScroll, {
        passive: true,
      })

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function closeMenu() {
    setIsMenuOpen(false)
  }


  return (
    <header
          className={`${styles.header} ${
            isScrolled ? styles.headerScrolled : ''
          }`}
        >
      <div className={styles.headerMain}>
        {/* Desktop social icons */}
        <SocialLinks className={styles.desktopSocials} />

        {/* Mobile hamburger */}
        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo */}
        <div className={styles.brand}>
          <Link
            href="/"
            className={styles.brandLink}
            onClick={closeMenu}
          >
            <h1>
              <span>THE BREAKDOWN</span>
            </h1>
          </Link>
        </div>

        {/* Right-hand actions */}
        <div className={styles.actions}>
          <Link href="/subscribe">Subscribe</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>

      {/* Desktop navigation */}
      <nav className={styles.navigation} aria-label="Main navigation">
        {navigation.map((item) => {
          const active = isActive(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? styles.navActive : undefined}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile backdrop */}
      <button
        type="button"
        className={`${styles.menuBackdrop} ${
          isMenuOpen ? styles.backdropOpen : ''
        }`}
        onClick={closeMenu}
        aria-label="Close navigation menu"
        tabIndex={isMenuOpen ? 0 : -1}
        aria-hidden={!isMenuOpen}
      />

      {/* Mobile flyout */}
      <nav
        id="mobile-navigation"
        className={`${styles.mobileNav} ${
          isMenuOpen ? styles.mobileNavOpen : ''
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <div className={styles.mobileNavHeader}>
          <span>MENU</span>

          <button
            type="button"
            className={styles.mobileClose}
            onClick={closeMenu}
            aria-label="Close menu"
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <FaTimes />
          </button>
        </div>


        <div className={styles.mobileNavLinks}>
          {navigation.map((item) => {
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className={active ? styles.navActive : undefined}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className={styles.mobileActions}>
          <Link
            href="/"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Subscribe
          </Link>

          <Link
            href="/"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Login
          </Link>
        </div>


        <div className={styles.mobileNavFooter}>
          <p>FOLLOW THE BREAKDOWN</p>
          <SocialLinks />
        </div>
      </nav>
    </header>
  )
}

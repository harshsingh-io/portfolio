import { profile, nav } from '../content/portfolio'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <p className="footer__name">
          {profile.name}
          <span className="footer__role"> · {profile.role}</span>
        </p>

        <nav aria-label="Footer">
          <ul className="footer__links">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mono footer__meta">
          <a href={profile.links.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <span aria-hidden="true"> · </span>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <span aria-hidden="true"> · </span>
          <a href={`mailto:${profile.email}`}>Email</a>
        </p>

        <p className="footer__copyright">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  )
}

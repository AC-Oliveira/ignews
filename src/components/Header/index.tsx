import ActiveLink from '../ActiveLink';
import { SignButton } from '../SiginButton';
import styles from './styles.module.scss';

export function Header(): JSX.Element {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news"/>
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a className={styles.active}>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignButton/>
      </div>
    </header>
  );
}
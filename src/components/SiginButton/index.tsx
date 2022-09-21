import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './styles.module.scss';

export function SignButton() {
  const { data: session } = useSession();


  return (
    <button type='button' className={styles.signButton} onClick={session ? () => signOut() : () => signIn('github')}>
      <FaGithub color={session ? '04d361': 'eba417'} />
      {/* eslint-disable-next-line max-len */}
      {/* <img src={session.user.image} alt="User" width={30} height={30} style={{border: 'none', borderRadius: '50%', marginRight: '15px'}}/> */}
      {session ? session?.user.name : 'Sign in with Github'}
      {session && <FiX color='#737380' className={styles.closeIcon} />}
    </button>
  );
}
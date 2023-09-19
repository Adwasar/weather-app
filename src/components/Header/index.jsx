import styles from './Header.module.scss';
import PropTypes from 'prop-types';

export default function Header({ city, state, temperature }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <img className={styles.logo} src="src/assets/img/logo-white.svg" alt="Logo" />
        <div>
          <span className={styles.city}>{city}</span>
          <span className={styles.state}>, {state}</span>
          <span className={styles.temperature}>{temperature} ℃</span>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
};

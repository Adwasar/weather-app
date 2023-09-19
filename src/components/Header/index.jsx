import styles from './Header.module.scss';
import PropTypes from 'prop-types';

export default function Header({ city, state }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div>
          <img src="#" alt="Logo" />
          <span>WeatherWave</span>
        </div>
        <div>
          <span>
            {city}, {state}
          </span>
          <span>Температура</span>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

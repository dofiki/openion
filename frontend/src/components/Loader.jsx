import './Loader.css';

export default function Loader({ isDark }) {
  return (
    <div className={`loader-wrapper ${isDark ? 'dark' : 'light'}`}>
      <div className="loader" />
    </div>
  );
}

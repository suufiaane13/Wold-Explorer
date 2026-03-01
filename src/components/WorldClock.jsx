import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { 
  getTimeInTimezone, 
  formatTime, 
  getCountryMainTimezone, 
  getTimezoneOffset,
  getTimeIcon 
} from '../utils/timezone';

const WorldClock = ({ country, showDate = false, size = 'sm', className = '' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timezone, setTimezone] = useState('UTC');

  useEffect(() => {
    if (country) {
      const countryTimezone = getCountryMainTimezone(country);
      setTimezone(countryTimezone);
    }
  }, [country]);

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeInTimezone = getTimeInTimezone(timezone);
        setCurrentTime(timeInTimezone);
      } catch (error) {
        setCurrentTime(new Date());
      }
    };

    // Mise à jour immédiate
    updateTime();

    // Mise à jour chaque seconde
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone, country]);

  const timeString = formatTime(currentTime, { showSeconds: size === 'lg' });
  const timeIcon = getTimeIcon(currentTime);
  const offset = getTimezoneOffset(timezone);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`d-flex align-items-center ${className}`}
    >
      <span className="me-1" style={{ fontSize: size === 'lg' ? '1.2em' : '1em' }}>
        {timeIcon}
      </span>
      
      <div className="d-flex flex-column">
        <div className={`d-flex align-items-center ${sizeClasses[size]}`}>
          <Clock size={size === 'lg' ? 16 : 14} className="me-1 text-muted" />
          <span className="fw-medium">{timeString}</span>
        </div>
        
        {showDate && (
          <small className="text-muted">
            {currentTime.toLocaleDateString('fr-FR', {
              weekday: 'short',
              day: 'numeric',
              month: 'short'
            })}
          </small>
        )}
        
        {size === 'lg' && offset !== 'Même heure' && (
          <small className="text-muted">
            {offset}
          </small>
        )}
      </div>
    </motion.div>
  );
};

export default WorldClock;

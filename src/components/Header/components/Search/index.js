import React, { useState, useEffect } from 'react';
import styles from './index.module.sass';
import Button from '../../../Button';
import { useSpring, animated } from 'react-spring';

/**
 * Search Component
 *
 * @name Search
 * @description Componente para realizar búsquedas
 *
 * @example
 *
 *      <Search />
 *
 * @returns {React.Component}
 */

function Search({
  history,
  match,
  activeSearch,
  setActiveSearch,
  isFullSizeDevice,
  setIsLightMode,
}) {
  const {
    params: { category, family },
  } = match;
  const [inputText, setInputText] = useState((category === 'busqueda' && family) || '');

  const searchTrigger = () => {
    if (inputText.length) {
      if (inputText === '!darkMode' || inputText === '!lightMode') {
        const theme = inputText === '!lightMode';
        localStorage.theme = theme;

        setIsLightMode(theme);
        setInputText('');
      } else if (inputText.includes('!say:')) {
        const speak = new SpeechSynthesisUtterance(inputText.replace('!say:', ''));
        window.speechSynthesis.speak(speak);
        setInputText('');
      } else {
        history.push(`/busqueda/${inputText}`);
      }

      setActiveSearch(false);
      document.getElementById('inputTextSearch').blur();
    }
  };

  const searchClean = () => {
    inputText.length && setInputText('');
    document.getElementById('inputTextSearch').focus();
  };

  useEffect(() => {
    if (activeSearch) {
      const listener = () => {
        setActiveSearch(false);
      };
      window.addEventListener('click', listener);
      return () => {
        window.removeEventListener('click', listener);
      };
    }
  }, [activeSearch, setActiveSearch]);

  const barWidth = (isFullSizeDevice && '600px') || '100%';
  const activeBarWidth = (isFullSizeDevice && '1000px') || '100%';
  const barTranslate = (isFullSizeDevice && '233px') || '0px';

  const searchBarTransitionProps = useSpring({
    width: (activeSearch && activeBarWidth) || barWidth,
    transform: (activeSearch && `translateX(-${barTranslate})`) || 'translateX(0px)',
  });

  const buttonSearchStyle = useSpring({
    width: (activeSearch && '120px') || '48px',
    config: { mass: 1, tension: 210, friction: 26 },
  });

  const cleanTextTransitionProps = useSpring({
    opacity: (inputText.length && 1) || 0,
    config: { mass: 1, tension: 190, friction: 26 },
  });

  const handleOnFocus = () => setActiveSearch(true);
  const handleOnChange = (e) => setInputText(e.target.value);
  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') searchTrigger();
  };

  return (
    <animated.div
      id={styles.searchBox}
      style={searchBarTransitionProps}
      onClick={(e) => {
        e.stopPropagation();
      }}>
      <div className={`${styles.container} ${styles[activeSearch]}`}>
        {activeSearch && (
          <i
            id={styles.searchIcon}
            className="material-icons"
            onClick={() => {
              if (activeSearch) {
                setActiveSearch(false);
              }
            }}>
            arrow_back
          </i>
        )}
        <input
          id="inputTextSearch"
          type="text"
          value={inputText}
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          placeholder="Busca el producto o marca que quieres"
          autoComplete="off"
        />
        <div id={styles.triggers}>
          {(inputText.length && activeSearch && (
            <animated.div id={styles.clean} style={cleanTextTransitionProps}>
              <Button type="tertiary" onClick={searchClean}>
                <span>Borrar</span>
              </Button>
            </animated.div>
          )) ||
            ''}
          <animated.div style={buttonSearchStyle} id={styles.triggerButton}>
            <Button type="quarter" onClick={searchTrigger}>
              {(!activeSearch && <i className="material-icons">search</i>) || <span>Buscar</span>}
            </Button>
          </animated.div>
        </div>
      </div>
    </animated.div>
  );
}

export default Search;

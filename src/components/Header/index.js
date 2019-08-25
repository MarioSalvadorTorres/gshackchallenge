import Button from '../Button';
import Search from './components/Search';
import styles from './index.module.sass';
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { ReactComponent as CategoryIcon } from './icons/categorias.svg';
import { ReactComponent as ElektraIcon } from './icons/logo-elektra.svg';

/**
 * Header Component
 *
 * @name Header
 * @description Componente para realizar búsquedas
 *
 * @param {String} params.history history de react router
 * @param {String} params.match
 *
 * @example
 *
 *      <Header />
 *
 * @returns {React.Component}
 */

const width = window.innerWidth;

function Header({ location, history, match, setIsLightMode }) {
  const pathname = location.pathname;
  const isDeepPage = pathname !== '/';
  const [scrollOrigin, setScrollOrigin] = useState(0);
  const [headerVisibility, setHeaderVisibility] = useState(true);
  const [buttonHistoryVisible, setButtonHistoryVisible] = useState(isDeepPage);
  const [showButton, setShowButton] = useState(buttonHistoryVisible);
  const [activeSearch, setActiveSearch] = useState(false);
  const isFullSizeDevice = width >= 1800;
  const scroll = (pos) => {
    window.scrollTo(pos, pos);
  };

  const [historyTransitionProps, setHistoryTransitionProps] = useSpring(() => ({
    transform: 'translateX(0px)',
    config: {
      mass: 1,
      tension: 240,
      friction: 25,
    },
  }));

  const headerTransitonProps = useSpring({
    transform: (headerVisibility && 'translateY(0px)') || 'translateY(-70px)',
    opacity: (headerVisibility && 1) || 0.4,
    config: { mass: 1, tension: 170, friction: 16 },
  });

  const noSearchElementsTransitionProps = useSpring({
    opacity: (!activeSearch && 1) || 0,
    config: { mass: 1, tension: 190, friction: 26 },
  });

  const historyVisibleNeedsTransition = isDeepPage !== buttonHistoryVisible;

  useEffect(() => {
    setButtonHistoryVisible(isDeepPage);
    if (historyVisibleNeedsTransition)
      setHistoryTransitionProps({
        transform: `translateX(-${(isFullSizeDevice && 159) || 62}px)`,
        immediate: isDeepPage,
        onRest: () => {
          setShowButton(isDeepPage);
          setHistoryTransitionProps({
            transform: 'translateX(0px)',
            onRest: undefined,
            immediate: !isDeepPage,
          });
        },
      });
  }, [isDeepPage, historyVisibleNeedsTransition, setHistoryTransitionProps, isFullSizeDevice]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHeaderVisibility(scrollOrigin > scrollY || scrollY < 100);
      setScrollOrigin(scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const smallContainerWidth = window.innerWidth - 512;
  const smallActiveContainerWidth = window.innerWidth - 32;
  const activeContainerWidth = (isFullSizeDevice && '1000px') || `${smallActiveContainerWidth}px`;
  const containerWidth = (isFullSizeDevice && '834px') || `${smallContainerWidth}px`;
  const containerTranslate = (isFullSizeDevice && '466px') || `${smallContainerWidth / 2}px`;
  const activeContainerTranslate =
    (isFullSizeDevice && '500px') || `${smallActiveContainerWidth / 2}px`;

  const searchContainerTransitionProps = useSpring(
    (activeSearch && {
      width: activeContainerWidth,
      transform: `translateX(-${activeContainerTranslate})`,
    }) || {
      width: containerWidth,
      transform: `translateX(-${containerTranslate})`,
    },
  );

  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const iconClass = (isFullSizeDevice && styles.icon) || '';
  const spacingType = (isFullSizeDevice && 'default') || 'circle';

  return (
    <animated.header
      id={styles.header}
      className="bg-header flex"
      onClick={() => scroll(0)}
      style={headerTransitonProps}>
      <animated.div
        onClick={stopPropagation}
        className={`flex ${(!isFullSizeDevice && styles.small) || ''}`}
        id={styles.mainLinks}
        style={{ ...historyTransitionProps, ...noSearchElementsTransitionProps }}>
        {showButton && (
          <Button type="tertiary" width={spacingType} link={'/'} onClick={goBack}>
            <i className={`material-icons ${iconClass} black`}>keyboard_arrow_left</i>
            {isFullSizeDevice && <span>Atras</span>}
          </Button>
        )}
        <Button
          type="tertiary"
          width={spacingType}
          onClick={() => {
            const scrollY = window.scrollY;
            if (scrollY < 100) history.push('/');
            else scroll(0);
          }}>
          <ElektraIcon className={iconClass} />
          {isFullSizeDevice && <span>Inicio</span>}
        </Button>
        {!isFullSizeDevice && (
          <Button type="tertiary" width={spacingType} link={'/departamentos'}>
            <CategoryIcon className={iconClass} />
            {isFullSizeDevice && <span>Departamentos</span>}
          </Button>
        )}
      </animated.div>
      <animated.div
        id={styles.searchContainer}
        className="flex"
        onClick={stopPropagation}
        style={searchContainerTransitionProps}>
        {isFullSizeDevice && (
          <animated.div style={noSearchElementsTransitionProps}>
            <Button type="tertiary" width={spacingType} link={'/departamentos'}>
              <CategoryIcon className={iconClass} />
              {isFullSizeDevice && <span>Departamentos</span>}
            </Button>
          </animated.div>
        )}
        <Search
          match={match}
          history={history}
          setActiveSearch={setActiveSearch}
          activeSearch={activeSearch}
          isFullSizeDevice={isFullSizeDevice}
          setIsLightMode={setIsLightMode}
        />
      </animated.div>
      <animated.div
        className="flex"
        style={noSearchElementsTransitionProps}
        onClick={stopPropagation}>
        <Button type="tertiary" width={spacingType} link={'/ayuda'}>
          <i className={`material-icons ${iconClass}`}>help</i>
          {isFullSizeDevice && <span>Ayuda</span>}
        </Button>
        <Button type="quarter" width={spacingType} link={'/checkout'}>
          <i className={`material-icons ${iconClass}`}>shopping_cart</i>
          {isFullSizeDevice && <span>Tu carrito</span>}
        </Button>
        <Button type="tertiary" width="circle" link={'/mi-cuenta'}>
          <i className="material-icons">lock</i>
        </Button>
      </animated.div>
    </animated.header>
  );
}

export default Header;

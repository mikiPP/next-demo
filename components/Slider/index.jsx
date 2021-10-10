/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.scss';
import { LEFT_ARROW_KEY_CODE, RIGHT_ARROW_KEY_CODE, ZERO } from '../../utils/constants';

const NEXT_SLIDE = 'nextSlide';
const PREV_SLIDE = 'prevSlide';
const SET_SLIDE = 'setSlide';
const SET_IMAGES = 'setImages';

// If we are in the last position return to the first if not go next
const getNextSlide = ({ current, images }) => current === images.length - 1 ? ZERO : current + 1;
// If we are in the first position return to the last if not go to the previous
const getPrevSlide = ({ current, images }) => ZERO === current ? images.length - 1 : current - 1;

const reducer = (state, action) => {
  switch (action.type) {
    case NEXT_SLIDE:
      return { ...state, current: getNextSlide(state) };
    case PREV_SLIDE:
      return { ...state, current: getPrevSlide(state) };
    case SET_SLIDE:
      return { ...state, current: action.payload };
    case SET_IMAGES:
      return { ...state, images: action.payload };
    default:
      return state;
  }
};

const Slider = ({ images, indexToShow }) => {
  const [ state, dispatch ] = useReducer(reducer, { images, current: ZERO });

  const [ startTouchPosition, setStartTouchPosition ] = useState(ZERO);
  const [ mouseDown, setMouseDown ] = useState(false);
  const [ transition, setTransition ] = useState(ZERO);
  const [ dragTransition, setDragTransition ] = useState(ZERO);
  const [ width, setWidth ] = useState();
  const slidesRef = useRef();

  const nextSlide = () => {
    dispatch({ type: NEXT_SLIDE });
  };

  const prevSlide = () => {
    dispatch({ type: PREV_SLIDE });
  };

  const isRightArrowKey = (event) => RIGHT_ARROW_KEY_CODE === event.keyCode;
  const isLeftArrowKey = (event) => LEFT_ARROW_KEY_CODE === event.keyCode;

  const onKeyPress = (event) => {
    if (isRightArrowKey(event)) {
      nextSlide();
    }

    if (isLeftArrowKey(event)) {
      prevSlide();
    }
  };

  const onResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);
    window.addEventListener('resize', onResize);
    setWidth(window.innerWidth);
    
    return () => {
      document.removeEventListener('keydown', onKeyPress);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if ('number' === typeof indexToShow) {
      let current = indexToShow;

      if (ZERO > indexToShow) {
        current = ZERO;
      } else if (indexToShow > images.length) {
        current = images.length - 1;
      }
      dispatch({ type: SET_SLIDE, payload: current });
    }
  }, [ indexToShow ]);

  useEffect(() => {
    dispatch({ type: SET_IMAGES, payload: images });
  }, [ images ]);

  useEffect(() => {
    if (state.current) {
      slidesRef.current.style.transition = 'all .45s ease-out';
    }
    setTransition(state.current * width * -1);
  }, [ state.current ]);

  const onDragstart = (e) => {
    setMouseDown(true);
    slidesRef.current.style.transition = 'unset';
    if (!startTouchPosition) {
      const position = 'mousedown' === e.type ? e.pageX : e?.changedTouches?.[ZERO]?.pageX;
      setStartTouchPosition(position);
    }
  };
  const onDrag = (e) => {
    if (mouseDown) {
      const position = 'mousemove' === e.type ? e.pageX : e?.changedTouches?.[ZERO]?.pageX;
      const difference = position - startTouchPosition;
      const newTransition = (transition - dragTransition) + difference;

      if (ZERO > newTransition && Math.abs(newTransition) < width * (state.images.length - 1)) {
        setTransition(newTransition);
        setDragTransition(difference);
      }
    }
  };

  const onDragEnd = () => {
    slidesRef.current.style.transition = 'all .45s ease-out';
    setMouseDown(false);
    setStartTouchPosition(ZERO);
    setDragTransition(ZERO);
    const currentImage = Math.round(transition / width) * -1;
    dispatch({ type: SET_SLIDE, payload: currentImage });
    setTransition((currentImage * width) * -1);
  };

  return (
    <div className={styles.slider}>
      <div
        className={styles.slides}
        ref={slidesRef}
        onMouseDown={onDragstart}
        onMouseMove={onDrag}
        onMouseUp={onDragEnd}
        onTouchMove={onDrag}
        onTouchStart={onDragstart}
        onTouchEnd={onDragEnd}
        style={{ transform: `translateX(${transition}px)`, width: `${width * (state?.images?.length)}px` }}
      >
        {images.map((imageUrl, index) => (
          <div key={index} onKeyPress={onKeyPress} style={{ backgroundImage: `url(${imageUrl})`, width: `${width}px` }} alt={`img ${index}`} className={styles["slider-img"]} />
      ))}
      </div>
      {1 < images.length && (
        <button className={`${styles.arrow} ${styles.left}`} type="button" onClick={prevSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}
      {1 < images.length && (
        <button className={`${styles.arrow} ${styles.right}`} type="button" onClick={nextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
};

Slider.defaultProps = {
  indexToShow: null,
  images: [],
};

Slider.propTypes = {
  indexToShow: PropTypes.number,
  images: PropTypes.array,
};

export default Slider;

/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';

import { getPosts } from '../../api/todo';
import Slider from '../../components/Slider';
import Spinner from '../../components/Spinner';
import Card from '../../components/Card';
import AuthContext from '../../contexts/authContext';
import { isEmpty } from '../../utils/functions';

import styles from './index.module.scss';
import { ZERO } from '../../utils/constants';

const images = [ 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?cs=srgb&dl=pexels-antonio-batini%C4%87-4164418.jpg&fm=jpg', 'https://images.pexels.com/photos/325111/pexels-photo-325111.jpeg?cs=srgb&dl=pexels-marc-mueller-325111.jpg&fm=jpg', 'https://images.pexels.com/photos/52608/pexels-photo-52608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' ];

const HomePage = () => {
  const auth = useContext(AuthContext);

  const [ loading, setLoading ] = useState(false);
  const [ posts, setPosts ] = useState([]);

  const CARDS_TO_SHOW = 12;

  useEffect(() => {
    setLoading(true);

    getPosts()
      .then((dbPosts) => {
        const dbPostsCopy = [ ...dbPosts ].splice(ZERO, CARDS_TO_SHOW);
        setPosts(dbPostsCopy);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles["home-page"]}>
      <header className={styles.header} >
        <h1 className={styles.header__title}> Hi {auth.email || 'Guest'} ! </h1>

        {loading && <Spinner />}

        <div className={styles.header__cards}>
          {!isEmpty(posts) && posts.map((post) => <Card key={post.id} todo={post} />)}
        </div>
      </header>
      <section className={styles["slider-wrapper"]}>
        <Slider images={images} />
      </section>
    </div>
  );
};
export default HomePage;

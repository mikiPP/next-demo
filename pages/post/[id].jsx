import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import Head from 'next/head';

import { getPosts } from "../../api/todo";
import styles from './index.module.scss'
import Button from '../../components/Button';

export const getServerSideProps = async ({query}) => {
  const id = Number(query.id); 

  // const postSelected = getPosts()
  //   .then((posts) => {
  //     return posts.find((post) => id === post.id);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })

  const posts = await getPosts();
  const postSelected = posts.find((post) => id === post.id);


  return {
    props: {
      postSelected,
    },
  };
}

const PostPage = ({postSelected}) => {
  return(
    <div className={styles["post-page"]}>
      <Head>
        <title>{postSelected.title}</title> 
      </Head>
      <div className={styles.post__img} style={postSelected.url ? { backgroundImage: `url(${postSelected.url})` } : null} />
        <div className={styles.post}>
          <div className={styles.post__info}>
            <h1 className={styles.post__title}>Post: {postSelected.title}</h1>

            <div className={styles.post__description}>
              {postSelected.body}
            </div>

            <div className={styles["post__created-by"]}>
              <p>Created by :</p>
              <p>Peter Collins</p>
            </div>
          </div>
          <div className={styles.post__share}>
            <div className={styles["post__share-title"]}>
              <p>Did you like it ?</p>
            </div>
            <div className={styles["post__share-options"]}>
              <Button text="Share" className={styles["post__share-button"]} />
              <FontAwesomeIcon className={styles["post__share-like"]} icon={faHeart} />
              <FontAwesomeIcon className={styles["post__share-favourite"]} icon={faStar} />
            </div>
          </div>
      </div>      
    </div>
  )
}

export default PostPage;
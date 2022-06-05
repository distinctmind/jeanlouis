import Link from "next/link";

import styles from "../styles/BlogCard.module.css";

export default function BlogCard({
  title,
  author,
  coverPhoto,
  datePublished,
  slug,
}) {
  return (
    <Link href={"/posts/" + slug}>
      <div className={styles.card}>
        <div className={styles.imgContainer}>
          {coverPhoto && <img src={coverPhoto.url} />}
        </div>
        <div className={styles.text}>
          <h2>{title}</h2>
          <div className={styles.detail}>
            <div className={styles.author}>
              <img src={author.avatar.url} />
              <h3>{author.name}</h3>
            </div>
            <div className={styles.date}>
              <h3>{datePublished}</h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

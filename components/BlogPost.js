import styles from "../styles/BlogPost.module.css";
import moment from "moment";

export default function BlogPost({
  title,
  author,
  coverPhoto,
  datePublished,
  content,
}) {
  return (
    <main className={styles.blog}>
      {coverPhoto && <img src={coverPhoto.url} className={styles.cover} />}
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content.html }}
      ></div>
      <div className={styles.authdetails}>
        <img src={author.avatar.url} />
        <div className={styles.authtext}>
          <h6>By {author.name}</h6>
          <h6 className={styles.date}>
            {moment(datePublished).format("MMMM DD, YYYY")}
          </h6>
        </div>
      </div>
    </main>
  );
}

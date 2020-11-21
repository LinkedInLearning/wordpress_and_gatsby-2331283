import React from "react"
import { Link } from "gatsby"
import style from "./postNav.module.css"

const PostNav = ({ prevPost, nextPost }) => {
  return (
    <nav className={style.postnav}>
      {prevPost && (
        <Link to={`/posts${prevPost.uri}`}>
          <div className={style.postnav__head}>Previous post:</div>
          <div className={style.postnav__title}>{prevPost.title}</div>
        </Link>
      )}

      {nextPost && (
        <Link to={`/posts${nextPost.uri}`}>
          <div className={style.postnav__head}>Next post:</div>
          <div className={style.postnav__title}>{nextPost.title}</div>
        </Link>
      )}
    </nav>
  )
}

export default PostNav

import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import style from "./single.module.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Catlist from "../components/Catlist"

const ArticleIndex = ({ data }) => {
  const posts = data.allWpPost.nodes

  return (
    <Layout>
      <SEO title="Articles" />
      <section className={style.articlelist}>
        <h1>Posts</h1>
        {posts.map((post, index) => (
          <article key={index} className={style.listitem}>
            {post.featuredImage && (
              <figure className={style.featimg}>
                <Link to={post.uri}>
                  <Img
                    fluid={
                      post.featuredImage.node.localFile.childImageSharp.fluid
                    }
                    alt={post.featuredImage.node.altText}
                  />
                </Link>
              </figure>
            )}
            <Catlist postObject={post} />
            <h2 className={style.article__title}>
              <Link to={`/posts${post.uri}`}>{post.title}</Link>
            </h2>
            <div className={style.article__meta}>
              by {post.author.node.name}. Published{" "}
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
            </div>
            <div
              className={style.article__content}
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
            <div className={style.article__tax}>
              Tagged:{" "}
              {post.tags.nodes.map((tag, index) => [
                index > 0 && ", ",
                <Link key={index} to={tag.link}>
                  {tag.name}
                </Link>,
              ])}
            </div>
          </article>
        ))}
      </section>
    </Layout>
  )
}

export default ArticleIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allWpPost(sort: { fields: date }, skip: $skip, limit: $limit) {
      nodes {
        date
        databaseId
        excerpt
        uri
        slug
        title
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            link
          }
        }
        tags {
          nodes {
            name
            link
          }
        }
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                fixed(height: 400, width: 400, cropFocus: ATTENTION) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

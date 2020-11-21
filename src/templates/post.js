import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import style from "./single.module.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Catlist from "../components/catlist"

export default ({ data }) => {
  const post = data.thePost
  return (
    <Layout>
      <SEO title={post.title} />
      <article className={style.article}>
        {post.featuredImage && (
          <figure className={style.featimg}>
            <Img
              fluid={post.featuredImage.node.localFile.childImageSharp.fluid}
              alt={post.featuredImage.node.altText}
            />
          </figure>
        )}
        <Catlist postObject={post} />
        <h1 className={style.article__title}>{post.title}</h1>
        <div className={style.article__meta}>
          by {post.author.node.name}. Published{" "}
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div
          className={style.article__content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div>
          Tagged:{" "}
          {post.tags.nodes.map((tag, index) => [
            index > 0 && ", ",
            <Link key={index} to={tag.link}>
              {tag.name}
            </Link>,
          ])}
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($databaseId: Int!) {
    thePost: wpPost(databaseId: { eq: $databaseId }) {
      date
      databaseId
      content
      title
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          link
          name
        }
      }
      tags {
        nodes {
          link
          name
        }
      }
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1360) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import style from "./single.module.css"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const page = data.wpPage
  return (
    <Layout>
      <SEO title={page.title} />
      <article className={style.article}>
        {page.featuredImage && (
          <figure className={style.featimg}>
            <Img
              fluid={page.featuredImage.node.localFile.childImageSharp.fluid}
              alt={page.featuredImage.node.altText}
            />
          </figure>
        )}
        <h1>{page.title}</h1>
        <div>
          by {page.author.node.name}. Published on{" "}
          {new Date(page.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($databaseId: Int!) {
    wpPage(databaseId: { eq: $databaseId }) {
      title
      content
      author {
        node {
          name
        }
      }
      date
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

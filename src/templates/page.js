import React from "react"
import { graphql } from "gatsby"

import style from "./single.module.css"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const page = data.wpPage
  return (
    <Layout>
      <SEO title={page.title} />
      <article className={style.article}>
        <h1>{page.title}</h1>
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
    }
  }
`

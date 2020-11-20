import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => {
  const page = data.wpPage
  return (
    <article>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </article>
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

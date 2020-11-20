/**
 * Creates hierarchical menu based on WordPress menu.
 * @link https://www.wpgraphql.com/docs/menus/#hierarchical-data
 */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import UniversalLink from "../utils/UniversalLink"
import { FlatListToHierarchical } from "../utils/FlatListToHierarchical"

const MenuLoop = ({ menuItems }) => {
  return (
    <ul>
      {menuItems.map((menuItem, index) => {
        return (
          <li
            key={index}
            className={menuItem.routes.length > 0 ? "has-submenu" : undefined}
          >
            <UniversalLink to={menuItem.path} activeClassName="current-page">
              {menuItem.title}
            </UniversalLink>
            {menuItem.routes.length > 0 && (
              <MenuLoop menuItems={menuItem.routes}></MenuLoop>
            )}
          </li>
        )
      })}
    </ul>
  )
}

const FooterNav = () => {
  const wpMenu = useStaticQuery(graphql`
    {
      allWpMenuItem(
        sort: { fields: order, order: ASC }
        filter: { menu: { node: { slug: { eq: "all-pages" } } } }
      ) {
        nodes {
          id
          title: label
          path
          target
          parent: parentId
        }
      }
    }
  `)

  console.log("Raw data:", wpMenu.allWpMenuItem.nodes)
  const footerMenu = FlatListToHierarchical(wpMenu.allWpMenuItem.nodes, {
    idKey: "id",
    childrenKey: "routes",
    parentKey: "parent",
  })
  console.log("footerMenu: ", footerMenu)

  return (
    <nav style={{ textAlign: "left" }}>
      {footerMenu.length > 0 && <MenuLoop menuItems={footerMenu}></MenuLoop>}
    </nav>
  )
}

export default FooterNav

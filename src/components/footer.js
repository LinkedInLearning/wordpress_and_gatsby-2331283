import React from "react"

import FooterNav from "./footerNav"
import style from "./footer.module.css"

const Footer = () => {
  return (
    <footer className={style.footer}>
      <FooterNav />
      <div>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </div>
    </footer>
  )
}

export default Footer

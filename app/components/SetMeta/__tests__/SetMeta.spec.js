import React from "react"
import Helmet from "react-helmet"
import SetMeta from "../SetMeta"
import { titleTemplate } from "../constants"
import jestConfig from "projectRoot/jest.config"

describe("<SetMeta />", () => {
  describe("Helmet", () => {
    let wrapper

    afterEach(() => {
      wrapper.unmount()
    })

    it("creates correct meta, link, and title data", () => {
      // Given
      const meta = [{ name: "description", content: "Test description" }]
      const title = "Test title"
      const links = [{ rel: "canonical", href: jestConfig.testURL }]
      wrapper = mount(<SetMeta title={title} description={meta[0].content} />)
      // Then
      expect(Helmet.peek().metaTags).toEqual(meta)
      expect(Helmet.peek().linkTags).toEqual(links)
      expect(Helmet.peek().title).toEqual(titleTemplate(title))
    })

    it("creates correct 404 meta and title data", () => {
      // Given
      const meta = [
        { name: "description", content: "" },
        { name: "prerender-status-code", content: "404" },
      ]
      const title = "Page Not Found"
      const links = []
      wrapper = mount(<SetMeta pageNotFound={true} />)
      // Then
      expect(Helmet.peek().metaTags).toEqual(meta)
      expect(Helmet.peek().linkTags).toEqual(links)
      expect(Helmet.peek().title).toEqual(titleTemplate(title))
    })
  })
})

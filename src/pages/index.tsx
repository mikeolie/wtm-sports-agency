import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { pageStyles } from "../styles/main";

type DataProps = {
  contentfulEntry: {
    servicesPageContent: {
      raw: string;
    };
    aboutPageContent: {
      raw: string;
    };
  };
};

type OuterContentProps = {
  content: Array<ContentProps>;
  data: {};
  nodeType: string;
};
type ContentProps = {
  data: {};
  marks: [];
  nodeType: string;
  value: string;
};

type RawDataProps = {
  content: Array<OuterContentProps>;
  data: {};
  nodeType: string;
};

const IndexPage: React.FC<PageProps<DataProps>> = ({ data, path }) => {
  const parsedAboutPageData: RawDataProps = JSON.parse(
    data.contentfulEntry.aboutPageContent.raw
  );
  const parsedServicesPageData: RawDataProps = JSON.parse(
    data.contentfulEntry.servicesPageContent.raw
  );
  const [aboutPageOuterContent] = parsedAboutPageData.content;
  const [servicesPageOuterContent] = parsedServicesPageData.content;
  const [servicesPageContent] = servicesPageOuterContent.content;
  const [aboutPageContent] = aboutPageOuterContent.content;
  const { value: aboutSection } = aboutPageContent;
  const { value: servicesSection } = servicesPageContent;
  return (
    <main style={pageStyles}>
      <section>
        <header>Path: {path}</header>
        <h4>Index Page</h4>
      </section>
    </main>
  );
};

export const data = graphql`
  query MyQuery {
    contentfulEntry {
      ... on ContentfulWtmSportsContent {
        servicesPageContent {
          raw
        }
        aboutPageContent {
          raw
        }
      }
    }
  }
`;

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;

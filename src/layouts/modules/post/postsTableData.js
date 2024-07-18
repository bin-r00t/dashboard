import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import PropTypes from "prop-types";

const Tags = ({ tags }) => {
  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {tags.map((tag) => (
        <MDTypography key={tag} display="block" variant="button" fontWeight="medium">
          {tag}
        </MDTypography>
      ))}
    </MDBox>
  );
};

Tags.propTypes = {
  tags: PropTypes.array,
};

const Body = ({ content }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography variant="caption">{content}</MDTypography>
  </MDBox>
);

Body.propTypes = {
  content: PropTypes.string,
};

export const columns = [
  { Header: "Title", accessor: "title", width: "15%", align: "left" },
  { Header: "Slug", accessor: "slug", align: "left" },
  { Header: "Abstract", accessor: "abstract", align: "left" },
  { Header: "Author", accessor: "author", align: "left" },
  { Header: "Tags", accessor: "tags", align: "left" },
  { Header: "Body", accessor: "body", width: "25%", align: "left" },
  { Header: "Action", accessor: "action", align: "center" },
];

export default function parsePost(post) {
  return {
    rows: [
      {
        title: "nih",
        slug: "12-2-3-4",
        abstract: "asdfk",
        author: "sdlkfj",
        tags: "aaaa",
        body: <Body content="aslkdjfsldk" />,
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      // {
      //   author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
      //   function: <Job title="Manager" description="Organization" />,
      //   status: (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      //     </MDBox>
      //   ),
      //   employed: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       23/04/18
      //     </MDTypography>
      //   ),
      //   action: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       Edit
      //     </MDTypography>
      //   ),
      // },
    ],
  };
}

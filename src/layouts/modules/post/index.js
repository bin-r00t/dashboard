import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "examples/Tables/DataTable";
import parsePost, { columns } from "./postsTableData";
import { useState } from "react";
import MDButton from "components/MDButton";

function Post() {
  // const { rows } = parsePost();
  const [rows, setRows] = useState([]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12} mt={-5}>
            <Card>
              <MDBox mx={1} my={1} py={1} px={1} gap={2}>
                <MDButton color="secondary">Search</MDButton>
                <MDButton color="info">Add</MDButton>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Post Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {!rows.length && (
                  <p
                    style={{
                      textAlign: "center",
                      color: "#ccc",
                      margin: "8px",
                      paddingBottom: "20px",
                    }}
                  >
                    暂 无 数 据
                  </p>
                )}
                {!!rows.length && (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Post;

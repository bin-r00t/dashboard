import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card, Grid } from "@mui/material";
function Post() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} mb={3} mt={1}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <h1>1</h1>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <h1>1</h1>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <h1>1</h1>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Post;

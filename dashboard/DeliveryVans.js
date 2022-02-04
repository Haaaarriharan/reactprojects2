import { useState, useEffect, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import { customerApi } from "../../__fakeApi__/deliveryvansApi";
import { Table } from "../../components/dashboard/deliveryvans";
import useMounted from "../../hooks/useMounted";
import ChevronRightIcon from "../../icons/ChevronRight";
import DownloadIcon from "../../icons/Download";
import PlusIcon from "../../icons/Plus";
import UploadIcon from "../../icons/Upload";
import useSettings from "../../hooks/useSettings";
import gtm from "../../lib/gtm";
import axios from "axios";
const DeliveryVansList = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [deliveryVans, setDeliveryVans] = useState([]);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const getCustomers = useCallback(async () => {
    try {
      const data = await customerApi.getCustomers();
      const resp = await axios.get(
        "https://mi.duceapps.com/api/v1/van?pageNo=1&size=100"
      );
      console.log("Api Data Delivery Vans", resp.data);

      if (mounted.current) {
        const VansApiData = resp.data.van;
        setDeliveryVans([...deliveryVans].concat(VansApiData));
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);
  console.log(deliveryVans);

  return (
    <>
      <Helmet>
        <title>Dashboard: Delivery Vans Management | Cathedral Bistro</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? "xl" : false}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                Delivery Vans
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Typography color="textSecondary" variant="subtitle2">
                  Delivery Vans
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                  component={RouterLink}
                  to="/dashboard/delivery-vans/new"
                >
                  Add Delivery Vans
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Table deliveryVans={deliveryVans} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default DeliveryVansList;

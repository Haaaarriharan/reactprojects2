import { useEffect, useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@material-ui/core';
import useSettings from '../../hooks/useSettings';
import ArrowLeftIcon from '../../icons/ArrowLeft';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import useMounted from "../../hooks/useMounted";
import {
  Create
} from '../../components/dashboard/deliveryvans';
import axios from 'axios';

const ProductCreate = () => {
  const { settings } = useSettings();
  const mounted = useMounted();
  const [StaffData, setStaffData] = useState([]);
  const [Names, setNames] = useState([]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomers = useCallback(async () => {
    try {
      const resp = await axios.get("https://mi.duceapps.com/api/v1/user?pageNo=1&size=300");

      if (mounted.current) {
        const StaffApiData = resp.data;
        setStaffData([...StaffData].concat(StaffApiData));
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);


  //console.log("STAFF Data", StaffData);
  const DriverAlone = StaffData.filter((item) => item.role === "Driver");
  console.log("DRIVER ALONE", DriverAlone);
  const UserName = DriverAlone.map((item) => item.firstName);

  return (
    <>
      <Helmet>
        <title>Dashboard: Delivery Vans Create | Cathedral Bistro</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Add New
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
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard/delivery-vans"
                  variant="subtitle2"
                >
                  Delivery Vans
                </Link>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  New
                </Typography>

              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<ArrowLeftIcon fontSize="small" />}
                  sx={{ mt: 1 }}
                  to="/dashboard/delivery-vans"
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Create StaffData={DriverAlone} UserName={UserName} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductCreate;

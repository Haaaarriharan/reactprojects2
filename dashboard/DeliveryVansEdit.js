import { useState, useCallback, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@material-ui/core';
import { customerApi } from '../../__fakeApi__/deliveryvansApi';
import { Edit } from '../../components/dashboard/deliveryvans';
import useMounted from '../../hooks/useMounted';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import axios from 'axios';
import ArrowLeftIcon from '../../icons/ArrowLeft';

const MenuEdit = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [deliveryVan, setDeliveryVan] = useState(null);
  const [singleVanData, setSingleVanData] = useState("");
  const [UserName, setUserName] = useState([]);

  const ItemId = useParams();
  const temp = Number(ItemId.deliveryvansId);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await customerApi.getCustomer();
      const resp = await axios.get(`https://mi.duceapps.com/api/v1/van/${temp}`);
      const resp1 = await axios.get("https://mi.duceapps.com/api/v1/user?pageNo=1&size=100");
      const VanApiData = resp.data;

      if (mounted.current) {
        setDeliveryVan(data);
        setSingleVanData(VanApiData);
        const StaffApiData = resp1.data;
        setUserName([...UserName].concat(StaffApiData));
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  if (!deliveryVan) {
    return null;
  }
  //console.log("Delivey Van Edit", UserName);
  const DriverAlone = UserName.filter((item) => item.role === "Driver");
  console.log("DRIVER ALONE", DriverAlone);

  return (
    <>
      <Helmet>
        <title>Dashboard: User Edit | Cathedral Bistro</title>
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
                {singleVanData.make}
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard/analytics"
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="textPrimary"
                  variant="subtitle2"
                  component={RouterLink}
                  to="/dashboard/delivery-vans"
                >
                  Delivery Vans
                </Link>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  {singleVanData.make}

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
          <Box mt={3}>
            <Edit
              singlevandata={singleVanData}
              temp={temp}
              UserName={DriverAlone}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MenuEdit;

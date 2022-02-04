import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { customerApi } from '../../__fakeApi__/deliveryvansApi';
import {
  Details
} from '../../components/dashboard/deliveryvans';
import useMounted from '../../hooks/useMounted';
import ChevronRightIcon from '../../icons/ChevronRight';
import PencilAltIcon from '../../icons/PencilAlt';
import gtm from '../../lib/gtm';
import useSettings from '../../hooks/useSettings';
import axios from 'axios';

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'Logs', value: 'logs' }
];

const CustomerDetails = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [deliveryVans, setDeliveryVans] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');
  const temp = useParams();
  const VanId = Number(temp.deliveryvansId);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await customerApi.getCustomer();
      const resp = await axios.get(`https://mi.duceapps.com/api/v1/van/orders/${VanId}`);
      //console.log("API", resp.data);

      if (mounted.current) {
        setDeliveryVans(resp.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!deliveryVans) {
    return null;
  }
  //console.log("deliveryVans", deliveryVans);

  return (
    <>
      <Helmet>
        <title>Dashboard: Delivery Vans Details | Cathedral Bistro</title>
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
                {deliveryVans.make}
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
                  {deliveryVans.make}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<PencilAltIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  to={`/dashboard/delivery-vans/${deliveryVans.id}/edit`}
                  variant="contained"
                >
                  Edit
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>            
                <Details deliveryvans={deliveryVans} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerDetails;

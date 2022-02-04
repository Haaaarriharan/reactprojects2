import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import { customerApi } from '../../__fakeApi__/userApi';
import {
  UserSummary
} from '../../components/dashboard/user';
import useMounted from '../../hooks/useMounted';
import ChevronRightIcon from '../../icons/ChevronRight';
import PencilAltIcon from '../../icons/PencilAlt';
import gtm from '../../lib/gtm';
import useSettings from '../../hooks/useSettings';

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'Logs', value: 'logs' }
];

const CustomerDetails = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [customer, setCustomer] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await customerApi.getCustomer();

      if (mounted.current) {
        setCustomer(data);
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

  if (!customer) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard: User Details | Cathedral Bistro</title>
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
                {customer.name}
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
                  to="/dashboard/user"
                  variant="subtitle2"
                >
                  User
                </Link>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  {customer.name}
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
                  to="/dashboard/user/1/edit"
                  variant="contained"
                >
                  Edit
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  lg={settings.compact ? 6 : 4}
                  md={6}
                  xl={settings.compact ? 6 : 3}
                  xs={12}
                >
                  <UserSummary />
                </Grid>
              </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerDetails;

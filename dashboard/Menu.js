import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink, } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@material-ui/core';
import { customerApi } from '../../__fakeApi__/menuApi';
import { MenuListTable } from '../../components/dashboard/menu';
import useMounted from '../../hooks/useMounted';
import ChevronRightIcon from '../../icons/ChevronRight';
import PlusIcon from '../../icons/Plus';
import useSettings from '../../hooks/useSettings';
import gtm from '../../lib/gtm';
import axios from 'axios';

const CustomerList = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomers = useCallback(async () => {
    try {
      const data = await customerApi.getCustomers();
      console.log('data', data);
      const result = axios.get('https://mi.duceapps.com/api/v1/menu?pageNo=1&size=100');
      console.log('Menu DAta From Api', (await result).data);
      const MenuData = (await result).data;

      if (mounted.current) {
        setCustomers(MenuData);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  useEffect(() => {
    getCustomers();
  });

  return (
    <>
      <Helmet>
        <title>Dashboard: Menu Management | Material Kit Pro</title>
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
                Menu Management
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
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Management
                </Link>
                <Link
                  color="textSecondary"
                  component={RouterLink}
                  variant="subtitle2"
                  to="/dashboard/menu"
                >
                  Menu
                </Link>
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
                  to="/dashboard/menu/new"
                >
                  Add Menu
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <MenuListTable customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;

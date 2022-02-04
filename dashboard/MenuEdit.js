import { useState, useCallback, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@material-ui/core';
import { customerApi } from '../../__fakeApi__/customerApi';
import { MenuEditForm } from '../../components/dashboard/menu';
import useMounted from '../../hooks/useMounted';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import axios from 'axios';
import ArrowLeftIcon from '../../icons/ArrowLeft';

const MenuEdit = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [customer, setCustomer] = useState(null);
  const [ItemData, setItemData] = useState([]);

  const ItemId = useParams();
  console.log('UseParams', useParams());
  const temp = Number(ItemId.menuId);
  console.log(temp);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await customerApi.getCustomer();
      const resp = await axios.get('https://mi.duceapps.com/api/v1/menu');
      console.log(data);

      if (mounted.current) {
        const MenuItemData = resp.data;
        setItemData([...ItemData].concat(MenuItemData));
        setCustomer(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  if (!customer) {
    return null;
  }
  console.log('Api dat in Edit Component', ItemData.map((item) => item.id));
  const filterData = ItemData.filter((item) => item.id === temp);
  console.log('filterData', filterData);
  const newObj = filterData.reduce((a, b) => Object.assign(a, b), {});
  console.log({ newObj });

  return (
    <>
      <Helmet>
        <title>Dashboard: Menu Edit | Material Kit Pro</title>
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
                {newObj.name}
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
                  component={RouterLink}
                  to="dashboard/analytics"
                  variant="subtitle2"
                >
                  Management
                </Link>
                <Link
                  color="textPrimary"
                  variant="subtitle2"
                  component={RouterLink}
                  to="/dashboard/menu"
                >
                  Menu
                </Link>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  {newObj.name}
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
                  to="/dashboard/menu"
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box mt={3}>
            <MenuEditForm
              customer={newObj}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MenuEdit;

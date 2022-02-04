import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Button,
  // Button,
  Container,
  Divider,
  Grid,
  Link,
  Typography
} from '@material-ui/core';
import { customerApi } from '../../__fakeApi__/customerApi';
import useMounted from '../../hooks/useMounted';
import ChevronRightIcon from '../../icons/ChevronRight';
// import PencilAltIcon from '../../icons/PencilAlt';
import gtm from '../../lib/gtm';
import useSettings from '../../hooks/useSettings';
import axios from 'axios';
// import MenuDetailsList from '../../components/dashboard/customer/MenuDetailsList';
import MenuDetailsListed from '../../components/dashboard/menu/MenuDetailsListed';
import ArrowLeftIcon from '../../icons/ArrowLeft';

const MenuDetails = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [customer, setCustomer] = useState(null);
  const [Menu, setMenu] = useState([]);
  const ItemId = useParams();
  console.log('UseParams', useParams());
  console.log('Item Id', ItemId.menuId);
  useEffect(async () => {

  }, []);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await customerApi.getCustomer();
      console.log(data);
      const resp = await axios.get('https://mi.duceapps.com/api/v1/menu');
      console.log('Menu Items Data', resp.data);
      const MenuData = resp.data;
      setMenu([...Menu].concat(MenuData));

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

  if (!customer) {
    return null;
  }
  console.log('Menu', Menu);
  const temp = Number(ItemId.menuId);
  console.log('Id', typeof (temp));
  const FilteredMenu = Menu.filter((item) => item.id === temp);
  console.log('FilteredMenu', FilteredMenu);

  return (
    <>
      <Helmet>
        <title>Dashboard: Menu Details</title>
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
                {FilteredMenu.map((item) => item.name)}
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
                  {FilteredMenu.map((item) => item.name)}
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
          <Divider />
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
                {FilteredMenu.map((item) => (
                  <MenuDetailsListed
                    id={item.id}
                    name={item.name}
                  />
                ))}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MenuDetails;

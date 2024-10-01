import { Box, List, Stack, Toolbar } from '@mui/material';
import sitemap from 'routes/sitemap';
import LogoHeader from './LogoHeader';
import NavItem from './NavItem';

const NavItems = () => {
  return (
    <List
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {sitemap.map((navItem) => (
        <NavItem key={navItem.id} item={navItem} />
      ))}
    </List>
  );
};

const SidebarContent = () => {
  return (
    <>
      <Toolbar disableGutters>
        <LogoHeader />
      </Toolbar>

      <Box
        sx={(theme) => ({
          px: 5,
          height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
          overflowY: 'auto',
        })}
      >
        <Stack gap={2} py={2}>
          <NavItems />
        </Stack>
      </Box>
    </>
  );
};

export default SidebarContent;

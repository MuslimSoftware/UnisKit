import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  AppBar, 
  Button,
  Stack,
  Card,
  Divider
} from 'ui-library';
import ComponentShowcase from '../components/ComponentShowcase';

const Home: React.FC = () => {
  return (
    <Box>
      <AppBar position="fixed" color="primary">
        <Container>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 12 }}>
            <Typography variant="h6" color="textPrimary">UI Library Demo</Typography>
            {/* ThemeToggle component is used in ComponentShowcase */}
          </Box>
        </Container>
      </AppBar>
      
      <Container>
        <Box style={{ paddingTop: 80, paddingBottom: 40 }}>
          <Card style={{ padding: 24, marginBottom: 32 }}>
            <Typography variant="h3" style={{ marginBottom: 16 }}>
              React Native Expo UI Library
            </Typography>
            <Typography variant="body1" style={{ marginBottom: 24 }}>
              A comprehensive UI component library for React Native Expo, inspired by Material UI.
              This showcase demonstrates all the components with dark/light mode support.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button color="primary" variant="contained">
                Get Started
              </Button>
              <Button color="secondary" variant="outlined">
                Documentation
              </Button>
            </Stack>
          </Card>
          
          <Divider style={{ marginBottom: 32 }} />
          
          <ComponentShowcase />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

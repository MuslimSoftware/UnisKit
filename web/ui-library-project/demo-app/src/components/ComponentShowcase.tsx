import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  Divider,
  Stack,
  Button,
  IconButton,
  TextField,
  Switch,
  Paper,
  Chip,
  Avatar,
  List,
  ListItem,
  Alert,
  Progress,
  Tabs,
  Tab
} from 'ui-library';

const ComponentShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [switchValue] = React.useState(false);
  // Use a simple theme object instead of useTheme hook
  const theme = {
    palette: {
      primary: { main: '#3f51b5' },
      secondary: { main: '#f50057' },
      success: { main: '#4caf50' },
      warning: { main: '#ff9800' },
      error: { main: '#f44336' },
      background: { default: '#ffffff' },
      text: { primary: '#000000' }
    },
    spacing: (factor: number) => factor * 8
  };
  
  // Use a simple boolean for dark mode detection
  const isDarkMode = false; // Simplified for compatibility

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  // Theme demonstration section
  const [themeInfo] = React.useState({
    primaryColor: theme.palette.primary.main,
    secondaryColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.default,
    textColor: theme.palette.text.primary,
    spacing: theme.spacing(1)
  });

  return (
    <Box>
      <Typography variant="h4" style={{ marginBottom: 24 }}>
        Component Showcase
      </Typography>

      {/* Theme Information Card */}
      <Card style={{ padding: 24, marginBottom: 24, backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }}>
        <Typography variant="h5" style={{ marginBottom: 16 }}>Current Theme</Typography>
        <Stack spacing={1}>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Primary Color:</Typography>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: 20, height: 20, backgroundColor: themeInfo.primaryColor, marginRight: 8, borderRadius: 4 }} />
              <Typography variant="body1">{themeInfo.primaryColor}</Typography>
            </Box>
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Secondary Color:</Typography>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: 20, height: 20, backgroundColor: themeInfo.secondaryColor, marginRight: 8, borderRadius: 4 }} />
              <Typography variant="body1">{themeInfo.secondaryColor}</Typography>
            </Box>
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Background Color:</Typography>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: 20, height: 20, backgroundColor: themeInfo.backgroundColor, marginRight: 8, borderRadius: 4 }} />
              <Typography variant="body1">{themeInfo.backgroundColor}</Typography>
            </Box>
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Text Color:</Typography>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: 20, height: 20, backgroundColor: themeInfo.textColor, marginRight: 8, borderRadius: 4 }} />
              <Typography variant="body1">{themeInfo.textColor}</Typography>
            </Box>
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Base Spacing:</Typography>
            <Typography variant="body1">{themeInfo.spacing}px</Typography>
          </Box>
        </Stack>
        <Typography variant="body2" style={{ marginTop: 16, fontStyle: 'italic' }}>
          The theme adapts to your system preferences for light and dark modes.
        </Typography>
      </Card>

      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Buttons" />
        <Tab label="Inputs" />
        <Tab label="Layout" />
        <Tab label="Surfaces" />
        <Tab label="Data Display" />
        <Tab label="Feedback" />
      </Tabs>

      <Box style={{ paddingTop: 24, paddingBottom: 24 }}>
        {activeTab === 0 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: 16 }}>Buttons</Typography>
            <Card style={{ padding: 24, marginBottom: 24 }}>
              <Typography variant="h6" style={{ marginBottom: 16 }}>Button Variants</Typography>
              <Stack direction="row" spacing={2} style={{ marginBottom: 24 }}>
                <Button variant="contained" color="primary">Contained</Button>
                <Button variant="outlined" color="primary">Outlined</Button>
                <Button variant="text" color="primary">Text</Button>
              </Stack>

              <Typography variant="h6" style={{ marginBottom: 16 }}>Button Colors</Typography>
              <Stack direction="row" spacing={2} style={{ marginBottom: 24 }}>
                <Button variant="contained" color="primary">Primary</Button>
                <Button variant="contained" color="secondary">Secondary</Button>
                <Button variant="contained" color="error">Error</Button>
                <Button variant="contained" color="warning">Warning</Button>
                <Button variant="contained" color="success">Success</Button>
              </Stack>

              <Typography variant="h6" style={{ marginBottom: 16 }}>Button Sizes</Typography>
              <Stack direction="row" spacing={2} style={{ marginBottom: 24 }}>
                <Button variant="contained" color="primary" size="small">Small</Button>
                <Button variant="contained" color="primary" size="medium">Medium</Button>
                <Button variant="contained" color="primary" size="large">Large</Button>
              </Stack>

              <Typography variant="h6" style={{ marginBottom: 16 }}>Icon Buttons</Typography>
              <Stack direction="row" spacing={2}>
                <IconButton color="primary">★</IconButton>
                <IconButton color="secondary">✓</IconButton>
                <IconButton color="error">✕</IconButton>
              </Stack>
            </Card>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: 16 }}>Inputs</Typography>
            <Card style={{ padding: 24, marginBottom: 24 }}>
              <Typography variant="h6" style={{ marginBottom: 16 }}>Text Fields</Typography>
              <Stack spacing={3} style={{ marginBottom: 24 }}>
                <TextField label="Standard" placeholder="Enter text" />
                <TextField label="Outlined" variant="outlined" placeholder="Enter text" />
                <TextField label="Filled" variant="filled" placeholder="Enter text" />
                <TextField label="With Helper Text" helperText="Some helper text" />
                <TextField label="Error State" error helperText="Error message" />
              </Stack>

              <Typography variant="h6" style={{ marginBottom: 16 }}>Switch</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Switch 
                  value={switchValue} 
                />
                <Typography>
                  {switchValue ? 'On' : 'Off'}
                </Typography>
              </Stack>
            </Card>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: 16 }}>Layout</Typography>
            <Card style={{ padding: 24, marginBottom: 24 }}>
              <Typography variant="h6" style={{ marginBottom: 16 }}>Stack</Typography>
              <Typography variant="body2" style={{ marginBottom: 16 }}>Horizontal Stack</Typography>
              <Stack direction="row" spacing={2} style={{ marginBottom: 24 }}>
                <Box style={{ width: 50, height: 50, backgroundColor: theme.palette.primary.main }} />
                <Box style={{ width: 50, height: 50, backgroundColor: theme.palette.secondary.main }} />
                <Box style={{ width: 50, height: 50, backgroundColor: theme.palette.success.main }} />
              </Stack>

              <Typography variant="body2" style={{ marginBottom: 16 }}>Vertical Stack</Typography>
              <Stack direction="column" spacing={2} style={{ marginBottom: 24 }}>
                <Box style={{ width: 100, height: 30, backgroundColor: theme.palette.primary.main }} />
                <Box style={{ width: 100, height: 30, backgroundColor: theme.palette.secondary.main }} />
                <Box style={{ width: 100, height: 30, backgroundColor: theme.palette.success.main }} />
              </Stack>

              <Typography variant="h6" style={{ marginBottom: 16 }}>Grid</Typography>
              <Box style={{ marginBottom: 24 }}>
                <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <Box style={{ flex: 1, height: 50, backgroundColor: theme.palette.primary.main }} />
                  <Box style={{ flex: 1, height: 50, backgroundColor: theme.palette.secondary.main }} />
                  <Box style={{ flex: 1, height: 50, backgroundColor: theme.palette.success.main }} />
                  <Box style={{ flex: 1, height: 50, backgroundColor: theme.palette.warning.main }} />
                  <Box style={{ flex: 1, height: 50, backgroundColor: theme.palette.error.main }} />
                </Box>
              </Box>
            </Card>
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: 16 }}>Surfaces</Typography>
            <Card style={{ padding: 24, marginBottom: 24 }}>
              <Typography variant="h6" style={{ marginBottom: 16 }}>Card</Typography>
              <Card style={{ padding: 16, marginBottom: 24 }}>
                <Typography variant="h6">Card Title</Typography>
                <Typography variant="body2">This is a card component that can contain various elements.</Typography>
                <Box style={{ marginTop: 16 }}>
                  <Button variant="text" color="primary">Action</Button>
                </Box>
              </Card>

              <Typography variant="h6" style={{ marginBottom: 16 }}>Paper</Typography>
              <Stack direction="row" spacing={2}>
                <Paper elevation={1} style={{ padding: 16, width: 100 }}>
                  <Typography>Elevation 1</Typography>
                </Paper>
                <Paper elevation={3} style={{ padding: 16, width: 100 }}>
                  <Typography>Elevation 3</Typography>
                </Paper>
                <Paper elevation={6} style={{ padding: 16, width: 100 }}>
                  <Typography>Elevation 6</Typography>
                </Paper>
              </Stack>
            </Card>
          </Box>
        )}

        {activeTab === 4 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: 16 }}>Data Display</Typography>
            <Card style={{ padding: 24, marginBottom: 24 }}>
              <Typography variant="h6" style={{ marginBottom: 16 }}>Typography</Typography>
              <Stack spacing={2} style={{ marginBottom: 24 }}>
                <Typography variant="h1">h1. Heading</Typography>
                <Typography variant="h2">h2. Heading</Typography>
                <Typography variant="h3">h3. Heading</Typography>
                <Typography variant="h4">h4. Heading</Typography>
                <Typography variant="h5">h5. Heading</Typography>
                <Typography variant="h6">h6. Heading</Typography>
                <Typography variant="subtitle1">subtitle1. Lorem ipsum dolor sit amet</Typography>
                <Typography variant="subtitle2">subtitle2. Lorem ipsum dolor sit amet</Typography>
                <Typography variant="body1">body1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                <Typography variant="body2">body2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                <Typography variant="button">BUTTON TEXT</Typography>
                <Typography variant="caption">caption text</Typography>
                <Typography variant="overline">OVERLINE TEXT</Typography>
              </Stack>

              <Typography variant="h6" style={{ marginBottom: 16 }}>Divider</Typography>
              <Box style={{ marginBottom: 24 }}>
                <Typography>Above divider</Typography>
                <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                <Typography>Below divider</Typography>
              </Box>

              <Typography variant="h6" style={{ marginBottom: 16 }}>Chip</Typography>
              <Stack direction="row" spacing={2} style={{ marginBottom: 24 }}>
                <Chip label="Basic" />
                <Chip label="Primary" color="primary" />
                <Chip label="Secondary" color="secondary" />
                <Chip label="Outlined" variant="outlined" />
                <Chip label="Deletable" onDelete={() => {}} />
              </Stack>

              <Typography variant="h6" style={{ marginBottom: 16 }}>Avatar</Typography>
              <Stack direction="row" spacing={2} style={{ marginBottom: 24 }}>
                <Avatar>A</Avatar>
                <Avatar color="primary">B</Avatar>
                <Avatar color="secondary">C</Avatar>
                <Avatar variant="rounded">D</Avatar>
                <Avatar variant="square">E</Avatar>
              </Stack>

              <Typography variant="h6" style={{ marginBottom: 16 }}>List</Typography>
              <List style={{ marginBottom: 24 }}>
                <ListItem primary="List Item 1" />
                <ListItem primary="List Item 2" />
                <ListItem primary="List Item 3" />
                <ListItem primary="List Item 4" />
              </List>
            </Card>
          </Box>
        )}

        {activeTab === 5 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: 16 }}>Feedback</Typography>
            <Card style={{ padding: 24, marginBottom: 24 }}>
              <Typography variant="h6" style={{ marginBottom: 16 }}>Alert</Typography>
              <Stack spacing={2} style={{ marginBottom: 24 }}>
                <Alert severity="info">This is an info alert — check it out!</Alert>
                <Alert severity="success">This is a success alert — check it out!</Alert>
                <Alert severity="warning">This is a warning alert — check it out!</Alert>
                <Alert severity="error">This is an error alert — check it out!</Alert>
              </Stack>

              <Typography variant="h6" style={{ marginBottom: 16 }}>Progress</Typography>
              <Stack spacing={3} style={{ marginBottom: 24 }}>
                <Progress variant="linear" value={25} />
                <Progress variant="linear" value={50} color="secondary" />
                <Progress variant="linear" value={75} color="success" />
                <Progress variant="circular" />
              </Stack>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ComponentShowcase;

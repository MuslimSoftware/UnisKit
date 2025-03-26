import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';

const ComponentShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [switchValue, setSwitchValue] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Theme information
  const themeInfo = {
    mode: theme.palette.mode,
    primaryColor: theme.palette.primary.main,
    secondaryColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.default,
    textColor: theme.palette.text.primary,
    spacing: theme.spacing(1)
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Component Showcase
      </Typography>

      {/* Theme Information Card */}
      <Card sx={{ p: 3, mb: 3, bgcolor: isDarkMode ? 'background.paper' : '#f5f5f5' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Current Theme</Typography>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Mode:</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{themeInfo.mode}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Primary Color:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 20, height: 20, bgcolor: themeInfo.primaryColor, mr: 1, borderRadius: 1 }} />
              <Typography variant="body1">{themeInfo.primaryColor}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Secondary Color:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 20, height: 20, bgcolor: themeInfo.secondaryColor, mr: 1, borderRadius: 1 }} />
              <Typography variant="body1">{themeInfo.secondaryColor}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Background Color:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 20, height: 20, bgcolor: themeInfo.backgroundColor, mr: 1, borderRadius: 1, border: '1px solid #ddd' }} />
              <Typography variant="body1">{themeInfo.backgroundColor}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Text Color:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 20, height: 20, bgcolor: themeInfo.textColor, mr: 1, borderRadius: 1 }} />
              <Typography variant="body1">{themeInfo.textColor}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Base Spacing:</Typography>
            <Typography variant="body1">{themeInfo.spacing}px</Typography>
          </Box>
        </Stack>
        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
          Toggle the theme using the switch in the app bar to see how components adapt to light and dark modes.
        </Typography>
      </Card>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Buttons" />
        <Tab label="Inputs" />
        <Tab label="Layout" />
        <Tab label="Surfaces" />
        <Tab label="Data Display" />
        <Tab label="Feedback" />
      </Tabs>

      <Box sx={{ py: 3 }}>
        {activeTab === 0 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>Buttons</Typography>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Button Variants</Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button variant="contained" color="primary">Contained</Button>
                <Button variant="outlined" color="primary">Outlined</Button>
                <Button variant="text" color="primary">Text</Button>
              </Stack>

              <Typography variant="h6" sx={{ mb: 2 }}>Button Colors</Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button variant="contained" color="primary">Primary</Button>
                <Button variant="contained" color="secondary">Secondary</Button>
                <Button variant="contained" color="error">Error</Button>
                <Button variant="contained" color="warning">Warning</Button>
                <Button variant="contained" color="success">Success</Button>
              </Stack>

              <Typography variant="h6" sx={{ mb: 2 }}>Button Sizes</Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button variant="contained" color="primary" size="small">Small</Button>
                <Button variant="contained" color="primary" size="medium">Medium</Button>
                <Button variant="contained" color="primary" size="large">Large</Button>
              </Stack>

              <Typography variant="h6" sx={{ mb: 2 }}>Icon Buttons</Typography>
              <Stack direction="row" spacing={2}>
                <IconButton color="primary">
                  <StarIcon />
                </IconButton>
                <IconButton color="secondary">
                  <CheckIcon />
                </IconButton>
                <IconButton color="error">
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Card>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>Inputs</Typography>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Text Fields</Typography>
              <Stack spacing={3} sx={{ mb: 3 }}>
                <TextField label="Standard" placeholder="Enter text" />
                <TextField label="Outlined" variant="outlined" placeholder="Enter text" />
                <TextField label="Filled" variant="filled" placeholder="Enter text" />
                <TextField label="With Helper Text" helperText="Some helper text" />
                <TextField label="Error State" error helperText="Error message" />
              </Stack>

              <Typography variant="h6" sx={{ mb: 2 }}>Switch</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Switch 
                  checked={switchValue} 
                  onChange={() => setSwitchValue(!switchValue)} 
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
            <Typography variant="h5" sx={{ mb: 2 }}>Layout</Typography>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Stack</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>Horizontal Stack</Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Box sx={{ width: 50, height: 50, bgcolor: 'primary.main' }} />
                <Box sx={{ width: 50, height: 50, bgcolor: 'secondary.main' }} />
                <Box sx={{ width: 50, height: 50, bgcolor: 'success.main' }} />
              </Stack>

              <Typography variant="body2" sx={{ mb: 2 }}>Vertical Stack</Typography>
              <Stack direction="column" spacing={2} sx={{ mb: 3 }}>
                <Box sx={{ width: 100, height: 30, bgcolor: 'primary.main' }} />
                <Box sx={{ width: 100, height: 30, bgcolor: 'secondary.main' }} />
                <Box sx={{ width: 100, height: 30, bgcolor: 'success.main' }} />
              </Stack>

              <Typography variant="h6" sx={{ mb: 2 }}>Grid</Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ flex: 1, height: 50, bgcolor: 'primary.main' }} />
                  <Box sx={{ flex: 1, height: 50, bgcolor: 'secondary.main' }} />
                  <Box sx={{ flex: 1, height: 50, bgcolor: 'success.main' }} />
                  <Box sx={{ flex: 1, height: 50, bgcolor: 'warning.main' }} />
                  <Box sx={{ flex: 1, height: 50, bgcolor: 'error.main' }} />
                </Box>
              </Box>
            </Card>
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>Surfaces</Typography>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Card</Typography>
              <Card sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6">Card Title</Typography>
                <Typography variant="body2">This is a card component that can contain various elements.</Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="text" color="primary">Action</Button>
                </Box>
              </Card>

              <Typography variant="h6" sx={{ mb: 2 }}>Paper</Typography>
              <Stack direction="row" spacing={2}>
                <Paper elevation={1} sx={{ p: 2, width: 100, textAlign: 'center' }}>
                  <Typography>Elevation 1</Typography>
                </Paper>
                <Paper elevation={3} sx={{ p: 2, width: 100, textAlign: 'center' }}>
                  <Typography>Elevation 3</Typography>
                </Paper>
                <Paper elevation={6} sx={{ p: 2, width: 100, textAlign: 'center' }}>
                  <Typography>Elevation 6</Typography>
                </Paper>
              </Stack>
            </Card>
          </Box>
        )}

        {activeTab === 4 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>Data Display</Typography>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Typography</Typography>
              <Stack spacing={2} sx={{ mb: 3 }}>
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

              <Typography variant="h6" sx={{ mb: 2 }}>Divider</Typography>
              <Box sx={{ mb: 3 }}>
                <Typography>Above divider</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>Below divider</Typography>
              </Box>

              <Typography variant="h6" sx={{ mb: 2 }}>Badge</Typography>
              <Stack direction="row" spacing={4} sx={{ mb: 3 }}>
                <Badge badgeContent={4} color="primary">
                  <NotificationsIcon />
                </Badge>
                <Badge badgeContent={99} color="secondary">
                  <MailIcon />
                </Badge>
                <Badge badgeContent="New" color="error">
                  <MailIcon />
                </Badge>
              </Stack>

              <Typography variant="h6" sx={{ mb: 2 }}>Chip</Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Chip label="Basic" />
                <Chip label="Primary" color="primary" />
                <Chip label="Secondary" color="secondary" />
                <Chip label="Outlined" variant="outlined" />
                <Chip label="Deletable" onDelete={() => {}} />
              </Stack>

              <Typography variant="h6" sx={{ mb: 2 }}>Avatar</Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Avatar>A</Avatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>B</Avatar>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>C</Avatar>
                <Avatar variant="rounded">D</Avatar>
                <Avatar variant="square">E</Avatar>
              </Stack>

              <Typography variant="h6" sx={{ mb: 2 }}>List</Typography>
              <List sx={{ mb: 3 }}>
                <ListItem>
                  <ListItemText primary="List Item 1" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="List Item 2" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="List Item 3" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="List Item 4" />
                </ListItem>
              </List>
            </Card>
          </Box>
        )}

        {activeTab === 5 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>Feedback</Typography>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Alert</Typography>
              <Stack spacing={2} sx={{ mb: 3 }}>
                <Alert severity="info">This is an info alert — check it out!</Alert>
                <Alert severity="success">This is a success alert — check it out!</Alert>
                <Alert severity="warning">This is a warning alert — check it out!</Alert>
                <Alert severity="error">This is an error alert — check it out!</Alert>
              </Stack>

              <Typography variant="h6" sx={{ mb: 2 }}>Progress</Typography>
              <Stack spacing={3} sx={{ mb: 3 }}>
                <LinearProgress variant="determinate" value={25} />
                <LinearProgress variant="determinate" value={50} colo<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>
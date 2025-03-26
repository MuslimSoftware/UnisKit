import React from 'react';
import { View, StyleSheet } from 'react-native';

// Import theme components
import ThemeProvider from './theme/ThemeProvider';
import { useTheme } from './theme/ThemeContext';

// Import layout components
import Box from './components/layout/Box';
import Container from './components/layout/Container';
import Grid from './components/layout/Grid';
import Stack from './components/layout/Stack';

// Import buttons
import Button from './components/buttons/Button';
import IconButton from './components/buttons/IconButton';

// Import inputs
import TextField from './components/inputs/TextField';
import Switch from './components/inputs/Switch';

// Import surfaces
import Card from './components/surfaces/Card';
import Paper from './components/surfaces/Paper';

// Import data display
import Typography from './components/data-display/Typography';
import Divider from './components/data-display/Divider';
import Badge from './components/data-display/Badge';
import Chip from './components/data-display/Chip';
import Avatar from './components/data-display/Avatar';
import { List, ListItem } from './components/data-display/List';

// Import feedback
import Alert from './components/feedback/Alert';
import Progress from './components/feedback/Progress';
import Dialog from './components/feedback/Dialog';

// Import navigation
import AppBar from './components/navigation/AppBar';
import { Tabs, Tab } from './components/navigation/Tabs';

// Import styles
import { makeStyles } from './styles/makeStyles';
import styled from './styles/styled';

// Export all components
export {
  // Theme
  ThemeProvider,
  useTheme,
  
  // Layout
  Box,
  Container,
  Grid,
  Stack,
  
  // Buttons
  Button,
  IconButton,
  
  // Inputs
  TextField,
  Switch,
  
  // Surfaces
  Card,
  Paper,
  
  // Data Display
  Typography,
  Divider,
  Badge,
  Chip,
  Avatar,
  List,
  ListItem,
  
  // Feedback
  Alert,
  Progress,
  Dialog,
  
  // Navigation
  AppBar,
  Tabs,
  Tab,
  
  // Styles
  makeStyles,
  styled
};
import React from "react";
import { Box, Grid, List, ListItemButton, ListItemText, Typography } from "@mui/material";

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#fbf3df",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        {/* Header */}
        <Typography variant="h3" sx={{ backgroundColor: "#f2f2f2", padding: 2, borderBottom: "1px solid #ccc" }}>
          Header
        </Typography>
        {/* List and Item */}
        <Grid container spacing={2} p={2} direction="row">
          <Grid item xs={6}>
            <Box sx={{ backgroundColor: "#f2f2f2", borderRadius: 8, padding: 2 }}>
              <Typography variant="h6">List</Typography>
              <List component="nav" aria-label="main mailbox folders">
                <ListItemButton>
                  <ListItemText primary="Personal" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Work" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Shopping" />
                </ListItemButton>
              </List>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ backgroundColor: "#ffffff", borderRadius: 8, padding: 2 }}>
              <Typography variant="h6">Item</Typography>
              <List component="nav" aria-label="main mailbox folders">
                <ListItemButton>
                  <ListItemText primary="Task 1" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Task 2" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Task 3" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Task 4" />
                </ListItemButton>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;

import { Card, CardContent, Typography, Button, Grid, Box } from "@suid/material"
import { A } from "@solidjs/router"
import { Component } from "solid-js"

const CTACards: Component = () => {
  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "white",
              height: "100%"
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Create News
              </Typography>
              <Typography sx={{ mb: 3 }}>
                Share your stories with the world. Start writing compelling news articles today.
              </Typography>
              <Button component={A} href="./news"
                variant="contained" 
                sx={{ 
                  bgcolor: "white", 
                  color: "#2196F3",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)"
                  }
                }}
              >
                Start Writing
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              background: "linear-gradient(45deg, #9c27b0 30%, #d23fe8 90%)",
              color: "white",
              height: "100%"
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Create Mailing
              </Typography>
              <Typography sx={{ mb: 3 }}>
                Reach your audience directly. Set up your mailing campaign in minutes.
              </Typography>
              <Button component={A} href="./mailing"
                variant="contained"
                sx={{ 
                  bgcolor: "white", 
                  color: "#9c27b0",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)"
                  }
                }}
              >
                Create Campaign
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

 function Title() {
    return (
        <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography 
                variant="h2" 
                component="h1"
                sx={{ 
                    fontWeight: "bold",
                    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 2
                }}
            >
                Transform Your Ideas Into Impact
            </Typography>
            <Typography 
                variant="h5" 
                color="text.secondary"
            >
                Create News • Share Stories • Build Connections
            </Typography>
        </Box>
    )
}


export default function Home() {
    return (
        <>
        <Title/>
        <CTACards/>
        </>
    )
}
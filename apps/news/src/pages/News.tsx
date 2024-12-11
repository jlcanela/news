import { 
    Card, 
    CardContent, 
    Typography, 
    Grid, 
    TextField, 
    Button, 
    Select, 
    MenuItem, 
    Box,
    ButtonGroup,
    Paper
  } from "@suid/material"
  import { createResource, createSignal, For } from "solid-js"
import { Article, ArticleRepository } from "../repositories/ArticleRepositories"
import { MainTitle } from "../components/Titles";
  
  const News = () => {
    const repo = new ArticleRepository();
    const [selectedTopic, setSelectedTopic] = createSignal("news")

    const [topics] = createResource(async () => {
        return await repo.getTopics();
    })

    // Form signals
    const [title, setTitle] = createSignal("")
    const [content, setContent] = createSignal("")
    const [topic, setTopic] = createSignal("news")
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        await(repo.createArticle(
            {
                title: title(),
                content: content(),
                topic: {name: topic()},
            }));
        setTitle("")
        setContent("")
    }
    
    //const [articles, setArticles] = createSignal([])

    // Create resource that depends on selectedTopic
    const [articles] = createResource(selectedTopic, async (topic) => {
        return await repo.getArticles({name: topic})
    })
    //const articles: Promise<Article[]> = repo.getArticles();
  
    return (
      <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 3 }}>
        {/* Create News Form */}
        {/*topics && topics().map((topic) => topic.name)*/}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <MainTitle>Create News Article</MainTitle>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Select
                    fullWidth
                    value={topic()}
                    onChange={(e) => setTopic(e.target.value)}
                    label="Topic"
                  >
                    { 

                        <For each={topics()}>
                      {(topicItem) => (
                          <MenuItem value={topicItem.name}>
                          {topicItem.name.charAt(0).toUpperCase() + topicItem.name.slice(1)}
                        </MenuItem>
                      )}
                    </For>
                    }
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={title()}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Content"
                    value={content()}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit">
                    Publish Article
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
  
        {/* Topic Filter */}
        <Paper sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <ButtonGroup variant="contained">
            <For each={topics()}>
              {(topic) => (
                <Button 
                  onClick={() => setSelectedTopic(topic.name)}
                  sx={{ 
                    bgcolor: selectedTopic() === topic.name ? 'primary.main' : 'primary.light',
                    '&:hover': {
                      bgcolor: selectedTopic() === topic.name ? 'primary.dark' : 'primary.main'
                    }
                  }}
                >
                  {topic.name.charAt(0).toUpperCase() + topic.name.slice(1)}
                </Button>
              )}
            </For>
          </ButtonGroup>
        </Paper>
  
        {/* Articles Grid */}
        <Grid container spacing={3}>
          <For each={articles()}>
            {(article) => (
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {article.title}
                    </Typography>
                    <Typography color="text.primary" sx={{ mb: 2 }}>
                      {article.topic.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {article.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </For>
        </Grid>
      </Box>
    )
  }
  
  export default News
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@suid/material";
import ProgressSteps from "../components/ProgressSteps";
import {
  Accessor,
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
  Signal,
} from "solid-js";
import showdown from "showdown";
import { SolidMarkdown } from "solid-markdown";
import { A } from "@solidjs/router";
import {
  Article,
  ArticleRepository,
  Topic,
} from "../repositories/ArticleRepositories";
import { MainTitle, SubTitle } from "../components/Titles";
import { Dynamic } from "solid-js/web";
import "./mailing.css";
const converter = new showdown.Converter();

interface SelectArticlesContext {
  topic: Topic;
  articles: Article[];
  message: string;
}

interface SelectArticlesProps {
  articleRepository: ArticleRepository;
  initialContext?: Accessor<SelectArticlesContext>;
  onSelect: (SelectArticlesContext) => void;
}

function SelectArticles(props: SelectArticlesProps) {
  const [selectedTopic, setSelectedTopic] = createSignal<Topic | null>(
    props.initialContext?.().topic || null
  );
  const [selectedArticles, setSelectedArticles] = createSignal<Article[]>(
    props.initialContext?.().articles || []
  );

  const [topics] = createResource(() => props.articleRepository.getTopics());
  const [articles] = createResource(selectedTopic, (topic) =>
    topic ? props.articleRepository.getArticles(topic) : []
  );

  const handleTopicChange = (topicName: string) => {
    const topic = topics()?.find((t) => t.name === topicName);
    if (topic) {
      setSelectedTopic(topic);
      setSelectedArticles([]);
    }
  };

  const handleArticleToggle = (article: Article) => {
    const currentSelected = selectedArticles();
    const articleIndex = currentSelected.findIndex(
      (a) => a.title === article.title
    );

    if (articleIndex === -1) {
      setSelectedArticles([...currentSelected, article]);
    } else {
      setSelectedArticles(
        currentSelected.filter((_, index) => index !== articleIndex)
      );
    }
  };

  const handleSubmit = () => {
    if (selectedTopic() && selectedArticles().length > 0) {
      props.onSelect({
        topic: selectedTopic(),
        articles: selectedArticles(),
        message: props.initialContext().message,
      });
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <MainTitle>Choose Topic and Select Articles</MainTitle>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Topic</InputLabel>
        <Select
          value={selectedTopic()?.name || ""}
          onChange={(e) => handleTopicChange(e.target.value)}
        >
          <Show
            when={!topics.loading}
            fallback={<MenuItem>Loading...</MenuItem>}
          >
            <For each={topics()}>
              {(topic) => <MenuItem value={topic.name}>{topic.name}</MenuItem>}
            </For>
          </Show>
        </Select>
      </FormControl>

      <Show
        when={selectedTopic() && articles()}
        fallback={articles.loading && <Box>Loading articles...</Box>}
      >
        <Box sx={{ mb: 3 }}>
          <SubTitle>Select Articles</SubTitle>

          <List>
            <ListItem>
              <Checkbox checked={true} disabled={true} />
              <ListItemText primary="Introduction" />
            </ListItem>
            <For each={articles()}>
              {(article) => (
                <ListItem>
                  <Checkbox
                    checked={selectedArticles().some(
                      (a) => a.title === article.title
                    )}
                    onChange={() => handleArticleToggle(article)}
                  />
                  <ListItemText primary={article.title} />
                </ListItem>
              )}
            </For>
          </List>
        </Box>
      </Show>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!selectedTopic() || selectedArticles().length === 0}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
}

interface PersonalizeProps {
  articleRepository: ArticleRepository;
  context: Accessor<SelectArticlesContext>;
  onUpdateMessage: (message: string) => void;
  nextStep: () => void;
  previousStep: () => void;
}

function Personalize(props: PersonalizeProps) {
  const [message, setMessage] = createSignal(props.context().message || "");
  const [isValid, setIsValid] = createSignal(
    props.context().message.trim().length > 0
  );

  const handleMessage = (e) => {
    const newMessage = e.target.value;
    if (newMessage.trim().length > 0) {
      setIsValid(true);
    }
    setMessage(newMessage);
    props.onUpdateMessage(newMessage);
  };

  const handleSubmit = () => {
    props.nextStep();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <MainTitle>Personalize Mailing</MainTitle>

      <div class="mailing">
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Message"
            value={message()}
            onChange={handleMessage}
            sx={{ mb: 2 }}
          />
          <Dynamic
            component="div"
            innerHTML={converter.makeHtml(
              props.articleRepository.asMarkdownList(props.context().articles)
            )}
          />
        </Box>
      </div>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="outlined" onClick={props.previousStep}>
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isValid()}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
}

interface ReviewProps {
  articleRepository: ArticleRepository;
  context: Accessor<SelectArticlesContext>;
  nextStep: () => void;
  previousStep: () => void;
}

function Review(props: ReviewProps) {
  const markdown = props.articleRepository.asMarkdownList(
    props.context().articles
  );
  const updatedMarkDownn = `${props.context().message}\n${markdown}`;
  const handleSubmit = () => {
    props.nextStep();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <MainTitle>Review and Send</MainTitle>

      <Box sx={{ mb: 4 }} class="mailing">
        <Dynamic
          component="div"
          innerHTML={converter.makeHtml(updatedMarkDownn)}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="outlined" onClick={props.previousStep}>
          Previous
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Next
        </Button>
      </Box>
    </Paper>
  );
}

function MailingStatus() {
  return (
    <Paper sx={{ p: 3 }}>
      <MainTitle>Mailing status</MainTitle>
      <SubTitle>Your mailing have been successfully registered.</SubTitle>
      <Button component={A} href="/">
        Go to Home
      </Button>
    </Paper>
  );
}

export function Mailing() {
  const steps = ["Select Articles", "Personalize", "Review & Send"];
  const [currentStep, setCurrentStep] = createSignal(0);

  const repository = new ArticleRepository();

  const [sac, setSac] = createSignal<SelectArticlesContext>({
    topic: null,
    articles: [],
    message: "",
  });

  const forward = () => {
    setCurrentStep(currentStep() + 1);
  };

  const backward = () => {
    setCurrentStep(currentStep() - 1);
  };

  const onSelect = (ctx: SelectArticlesContext) => {
    setSac(ctx);
    forward();
  };

  return (
    <>
      <ProgressSteps
        steps={steps}
        activeStep={currentStep()}
        disabled={false}
      />
      <Show when={currentStep() == 0}>
        <SelectArticles
          articleRepository={repository}
          initialContext={sac}
          onSelect={onSelect}
        />
      </Show>
      <Show when={currentStep() == 1}>
        <Personalize
          articleRepository={repository}
          onUpdateMessage={(message) => setSac({ ...sac(), message })}
          nextStep={forward}
          previousStep={backward}
          context={sac}
        />
      </Show>
      <Show when={currentStep() == 2}>
        <Review
          articleRepository={repository}
          context={sac}
          nextStep={forward}
          previousStep={backward}
        />
      </Show>
      <Show when={currentStep() == 3}>
        <MailingStatus />
      </Show>
    </>
  );
}

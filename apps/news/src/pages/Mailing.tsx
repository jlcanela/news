import MailC from "@jlcanela/news-mailing";
import { useNavigate } from "@solidjs/router";

import { ArticleRepository } from "../repositories/ArticleRepositories";
import "@jlcanela/news-mailing/style.css";
export default function Mailing() {
  const articleRepository = new ArticleRepository();
  const navigate = useNavigate();

  return (<MailC articleRepository={articleRepository} goHome={() => navigate("/")}/>);
}

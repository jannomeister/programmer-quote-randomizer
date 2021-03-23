import React, { useState, useEffect } from "react";
import { Card, Skeleton, Typography } from "antd";
import { GithubOutlined, ReloadOutlined } from "@ant-design/icons";

import "./Entry.css";

const { Title, Text } = Typography;

const Entry = () => {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(
    "To be a hacker - when I use the term - is somebody who is creative and does wonderful things."
  );
  const [author, setAuthor] = useState("Tim Berners-Lee");

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    setLoading(true);
    const response = await fetch(
      "https://raw.githubusercontent.com/skolakoda/programming-quotes-api/master/backup/quotes.json"
    );

    const data = await response.json();
    const { author, en } = data[Math.floor(Math.random() * (data.length + 1))];

    setAuthor(author);
    setQuote(en);
    setLoading(false);
  };

  const viewGithub = () => {
    window.open("https://github.com");
  };

  const viewAuthor = () => {
    window.open(`https://en.wikipedia.org/wiki/${author}`);
  };

  const onRefresh = async () => {
    await fetchRandomQuote();
  };

  return (
    <div className="container">
      <Card
        title="Programming Quotes"
        style={{ width: 600, height: 600 }}
        actions={[
          <GithubOutlined key="edit" onClick={viewGithub} />,
          <ReloadOutlined key="reload" onClick={onRefresh} />,
        ]}
      >
        <Skeleton loading={loading} active>
          <Title level={2} className="title">
            <em>"{quote}"</em> -{" "}
            <Text className="author" onClick={viewAuthor}>
              {author}
            </Text>
          </Title>
        </Skeleton>
      </Card>
    </div>
  );
};

export default Entry;

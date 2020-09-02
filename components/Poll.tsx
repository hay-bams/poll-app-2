import * as React from 'react';
import { QandAsDocument, Answer, QandA } from '../types';
import {
  PollWrapper,
  Header,
  Paragraph,
  VoteMarker,
  VoteMeter,
  VoteTag,
  CheckMark,
  TotalVote,
  VoteText,
} from '../styles';
import checkCircle from '../static/check-circle.svg';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

export default function Poll({ qandas }: Props) {
  const [totalVotes, setTotalVotes] = React.useState<number>(0);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [voted, setVoted] = React.useState<boolean>(false);

  const [questions, setQuestions] = React.useState<QandA>({
    question: { text: '' },
    answers: [],
  });

  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * qandas.questions.length);
    setQuestions(qandas.questions[randomIndex]);
  }, []);

  React.useEffect(() => {
    let votes: number = 0;
    questions.answers.forEach((answer: Answer) => {
      votes += answer.votes;
    });

    setTotalVotes(votes);
  }, [questions]);

  const vote = (event:any, index: number): void => {
    event.preventDefault();
    let selectedAnswer = questions.answers[index];
    selectedAnswer = { ...selectedAnswer, votes: selectedAnswer.votes + 1 };
    setQuestions({
      ...questions,
      answers: [
        ...questions.answers.slice(0, index),
        Object.assign({}, questions.answers[index], selectedAnswer),
        ...questions.answers.slice(index + 1),
      ],
    });

    setSelectedIndex(index);
    setVoted(true);
  };

  const getPercentage = (index: number, total: number): number => {
    const voteScore = Math.floor(
      (questions.answers[index].votes / total) * 100
    );

    return voteScore;
  };

  const isHighestScore = (index: number): boolean => {
    let highestScore = 0;
    questions.answers.forEach((answer: Answer) => {
      if (answer.votes >= highestScore) {
        highestScore = answer.votes;
      }
    });

    if (questions.answers[index].votes === highestScore) {
      return true;
    }
    return false;
  };

  console.log('questions and answers: ', questions);
  return (
    <PollWrapper>
      <Header>{questions.question.text}</Header>
      {questions.answers.map((answer: Answer, index: number) => {
        const voteScore = getPercentage(index, totalVotes);
        return (
          <Paragraph voted={voted} onClick={(event) => vote(event, index)} key={index}>
            <VoteMarker>
              <VoteTag>
                <VoteText voted={voted} highestVote={isHighestScore(index)}>
                  {answer.text}{' '}
                </VoteText>
                {voted && selectedIndex === index ? (
                  <CheckMark src={checkCircle} alt="Check Mark" />
                ) : (
                  ''
                )}{' '}
              </VoteTag>
              <VoteTag marginTop="3px">{voted ? `${voteScore}%` : ''}</VoteTag>
            </VoteMarker>
            <VoteMeter
              voted={voted}
              highestVote={isHighestScore(index)}
              width={voteScore}
            ></VoteMeter>
          </Paragraph>
        );
      })}
      <TotalVote>{voted ? `${totalVotes} Votes` : ''}</TotalVote>
    </PollWrapper>
  );
}

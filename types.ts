export type Question = {
  text: string;
};
export type Answer = {
  text: string;
  votes: number;
};
export type QandA = {
  question: Question;
  answers: Answer[];
};
export type QandAsDocument = {
  questions: QandA[];
};

export type StyledParagraph = {
  voted: boolean;
}

export type StyledVoteMeter = {
  voted: boolean;
  highestVote: boolean;
  width: number;
}

export type StyledVoteTag = {
  marginTop?: string;
}

export type StyledVoted = {
  voted: boolean;
  highestVote: boolean;
}


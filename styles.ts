import styled from 'styled-components';
import { StyledParagraph, StyledVoteMeter, StyledVoteTag, StyledVoted } from './types'

export const PollWrapper = styled.div`
  width: 60%;
  margin: 80px auto;
  padding: 20px;
  border: 2px solid #1715150f;
  border-radius: 10px;
  box-shadow: 0 0 5px 5px #c3a2a20f;
`;

export const Header = styled.h1`
  font-size: 30px;
  font-weight: 700;
  margin-top: 0;
`;
export const Paragraph = styled.p<StyledParagraph>`
  border: 1px solid gray;
  padding: 10px;
  border-radius: 10px;
  cursor: ${(props) => (!props.voted ? 'pointer' : 'not-allowed')};

  pointer-events: ${(props) => (!props.voted ? 'initial' : 'none')};
  position: relative;
`;

export const VoteMarker = styled.span`
  margin: 0;
  height: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
`;

export const VoteMeter = styled.span<StyledVoteMeter>`
  &:after {
    content: ' ';
  }
  background-color: ${(props) =>
    props.voted && (props.highestVote ? '#a6f7f3' : '#d3d4d9')};

  width: ${(props) => props.width ? props.width : 0}%;

  display: block;
  margin: 0;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  transition-duration: 1s;
  transition-property: width
  transition-timing-function: ease-out;
`;

export const VoteTag = styled.span<StyledVoteTag>`
  display: block;
  font-size: 20px;
  margin-top: ${(props) => props.marginTop};
  position: relative;
`;

export const CheckMark = styled.img`
  width: 28px;
  position: absolute;
  top: 0;
`;

export const TotalVote = styled.div`
  margin-left: 2px;
  color: #9a9a9a;
`;

export const VoteText = styled.span<StyledVoted>`
    font-weight: ${(props) =>
      props.voted && props.highestVote ? 'bolder' : 'normal'}}
    color: ${(props) =>
      props.voted && props.highestVote ? '#000' : '#444141'}}
`;
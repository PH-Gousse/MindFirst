import {Center, Spinner, Text} from "native-base";
import React, {useCallback, useEffect, useState} from "react";
import MatchesList from "../../components/matches/MatchesList";
import {useDispatch, useSelector} from "react-redux";
import {getRankByUserAPI} from "../../store/actions/UserAction";

const MatchesScreen = props => {
  const dispatch = useDispatch();
  const {matches} = useSelector((state) => state.currentUser);
  const [isLoading, setIsLoading] = useState(matches.ranks.length === 0);

  const getRankByUser = useCallback(async() => {
    return dispatch(getRankByUserAPI());
  }, []);

  useEffect(() => {
    if (isLoading) {
      getRankByUser().then(r => {
        setIsLoading(false);
      }).catch(error => {
        console.log('MatchesScreen - getRankByUser', error);
      });
    }
  }, []);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner size='lg'/>
      </Center>
    )
  }

  return (
    <MatchesList dataSource={matches.ranks} navigation={props.navigation} getRankByUser={getRankByUser} />
  );
};

export default MatchesScreen;

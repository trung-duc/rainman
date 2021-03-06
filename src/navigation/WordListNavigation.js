/**
 * Copyright (c) 2017, Duc Nguyen
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of this software authors nor the names of its
 *       contributors may be used to endorse or promote products derived from
 *       this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL DUC NGUYEN BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @flow
 */

import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import WordListScreen from '../screens/WordListScreen';
import EditScreen from '../screens/EditScreen';
import WordScreen from '../screens/WordScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { deleteItem } from '../api/AsyncDB';
import { deleteWord, setCurrentWord } from '../api/WordActions';

import { ID, WORD } from '../constants/DB';

type Props = {
  dispatch: Function,
  nav: Object,
  currentWord: number,
  words: Array<{id: number, word: string, def: string}>,
  ids: Array<number>
}


export const WordListNavigator = StackNavigator({
  WordList: { screen: WordListScreen },
  Edit: { screen: EditScreen },
  Detail: { screen: WordScreen },
  Settings: { screen: SettingsScreen },
});

/**
 * Integrate react-navigation state into redux state tree. Note that:
 *    - navigation: the navigation state that now stored in redux
 *    - screenProps: react-navigation - the props that will be passed to each
 *      child screen's navigationOptions
 */
class WordListTempNavigator extends React.Component<Props> {
  render() {
    return (
      <WordListNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
        screenProps={{
          words: this.props.words,
          ids: this.props.ids,
          currentWord: this.props.currentWord,
          onDeleteWord: (id, words) => {
            deleteItem(words[id][WORD], () => {
              this.props.dispatch(deleteWord(id));
            });
          }
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.navWordList,

  // pass to WordScreen's navigationOptions
  currentWord: state.wordData.CURRENT_WORD,
  words: state.wordData.WORDS,
  ids: state.wordData.ALL_IDS
});



const WordListStackNavigator = connect(mapStateToProps)(WordListTempNavigator);

WordListStackNavigator.navigationOptions = {
  title: 'Word List',
}

export default WordListStackNavigator;

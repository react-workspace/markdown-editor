import *as React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

const Header = styled.header`
font-size: 1.5rem;
height: 2rem;
left: 0;
kine-height: 2rem;
padding: 0.5rem 1rem;
position: fixed;
right: 0;
top: 0;
`
const Wrapper = styled.div`
bottom: 0;
left: 0;
position: fixed;
right: 0;
top: 3rem;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`
const StorageKey = 'pages/editor:text' //保存時のキー名

const editor: React.FC = () => {
  //localStorageから取得した値をuseStateの初期値に設定。
  //nullを返す場合があるので,||""をつけて文字列が入るように。
  const [text, setText] = useState<string>(localStorage.getItem(StorageKey) || '')

	return (
		<>
			<Header>
				Markdown Editor
			</Header>
			<Wrapper>
        <TextArea onChange={(e) => {
          const changedText = e.target.value
          localStorage.setItem(StorageKey, changedText)
          setText(changedText)
        }}
          value={text}/>
				<Preview>プレビューエリア</Preview>
			</Wrapper>
		</>
	)
}

export default editor

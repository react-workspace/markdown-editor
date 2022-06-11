import * as React from 'react'
import styled from 'styled-components'
import { Button } from './button'
import { useState } from 'react'

const Wrapper = styled.div`
  align-items: center;
  background-color: #0002;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`

const Modal = styled.div`
  background: #fff;
  padding: 1rem;
  width: 32rem;
`

const TitleInput = styled.input`
  width: 29rem;
  padding: 0.5rem;
`

const Control = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
`

interface Props {
	onSave: (title: string) => void //保存時の処理関数
	onCancel: () => void //キャンセル時の処理関数
}


const SaveModal: React.FC<Props> = props => {
	const { onCancel, onSave } = props
	const [title, setTitle] = useState(new Date().toISOString())
	//デフォルトはISO8601

	return (
		<div>
			<Wrapper>
				<Modal>
					<p>テキストの内容を保存します。</p>
					<p>保存内容のタイトルを入力して「保存」ボタンを押してください。</p>
					<p>
						<TitleInput
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</p>
					<Control>
						<Button onClick={onCancel} cancel /*cancel={true}*/ >
							キャンセル
						</Button>
						<Button onClick={() => onSave(title)}>
							保存
						</Button>
					</Control>
				</Modal>
			</Wrapper>
		</div>
	)
}

export default SaveModal

